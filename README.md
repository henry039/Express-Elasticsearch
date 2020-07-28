# Express-Elasticsearch
Built with JavaScript, NodeJS, Express, Pino, Elasticsearch, Kibana, Docker

# Prerequisites
- Node.js version > 10
- Docker

# Getting started on local
1. `docker-compose up -d` to start the containers in the background and leaves them running.

# Deployment
1. `docker-compose build`
2. `docker-compose push`

# Usage
- Get `http://localhost:5601/user/signUp` to enter Kibana dashboard
- Get `http://localhost:3000/health` pino would ingore health check
- Get `http://localhost:3000/typo`
- Get `http://localhost:3000/emitError`
- Get `http://localhost:3000/emitError2`

try to hit the route then see Kibana dashboard

# Dependencies
- [NodeJS](https://nodejs.org/) - Javascript runtime environment
- [Express](https://expressjs.com/) - NodeJS web framework
- [Pino](https://github.com/pinojs/pino) - Node.js logger.
