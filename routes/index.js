const express = require('express')

const userRouter = require('./users.router')
const gameRouter = require('./games.router')
const gameDaysRouter = require('./gameDays.router')
const schedulesRouter = require('./schedules.router')
const authRouter = require('./auth.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', userRouter)
  router.use('/games', gameRouter)
  router.use('/gameDays', gameDaysRouter)
  router.use('/schedules', schedulesRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApi
