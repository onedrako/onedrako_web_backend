const express = require('express')

const userRouter = require('./users.router')
const gameRouter = require('./games.router')
const gameDaysRouter = require('./gameDays.router')
const schedulesRouter = require('./schedules.router')
const authRouter = require('./auth.router')
const countriesRouter = require('./country.router')
const platformsRouter = require('./platforms.router')
const gamesPlatformsRouter = require('./game-platform.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', userRouter)
  router.use('/games', gameRouter)
  router.use('/gameDays', gameDaysRouter)
  router.use('/schedules', schedulesRouter)
  router.use('/auth', authRouter)
  router.use('/countries', countriesRouter)
  router.use('/platforms', platformsRouter)
  router.use('/game-platform', gamesPlatformsRouter)
}

module.exports = routerApi
