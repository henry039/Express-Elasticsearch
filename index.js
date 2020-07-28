const pino = require('pino')
const ecsFormat = require('@elastic/ecs-pino-format')()
const pinoElastic = require('pino-elasticsearch')
const express = require('express')
const pinoHttp = require('pino-http')

const streamToElastic = pinoElastic({
  index: 'express-app',
  consistency: 'one',
  node: 'http://elasticsearch:9200',
  // node: 'http://localhost:9200',
  'es-version': 7,
  'flush-bytes': 1000
})

// const logger = pino({ level: 'info',  ...ecsFormat, prettyPrint: { colorize: true }  })
const logger = pino({ level: 'info',  ...ecsFormat  }, streamToElastic)

const httpLogger = pinoHttp({
    logger,
    genReqId: () => Math.random().toString(36).slice(-6),
    customLogLevel: (res) => (res.statusCode >= 500 ? 'error' : 'info'),
    serializers: {
        err: ({type, message, stack}) => ({type, message, stack: stack.split('\n')[1].trim()})
    },
    autoLogging: {
        ignorePaths: ['/health']
    }
})

const emitError = () => {throw new Error('error from other function')}

const app = express()
app.use(httpLogger)
app.get('/typo', (req, res) => {
    const a = 'asf'
    const {empty} = null
    res.json(a)
})
app.get('/emitError', (req, res)=>{
    throw new Error('ooops')
})
app.get('/emitError2', (req, res)=>{
    emitError()
})
app.get('/fine', (req, res) => res.json('all good'))
app.get('/health', (req, res) => res.json({status: "health"}))
app.use((err, req, res, next)=>{
    // req.log.error({err}, 'An error occur')
    res.err = err
    res.status(500).json(err.message)
})

app.listen(3001, () => console.log('sever up'))
