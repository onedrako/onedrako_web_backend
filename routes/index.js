const express = require('express')

const userRouter = require('./users.router')
const gameRouter = require('./games.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', userRouter)
  router.use('/games', gameRouter)
}

module.exports = routerApi
