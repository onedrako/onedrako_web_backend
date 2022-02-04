const express = require('express')
const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/checkRole.handler')
const passport = require('passport')

const GameDayService = require('../services/gameDay.service')

const router = express.Router()
const service = new GameDayService()
const { createGameDaySchema, updateGameDaySchema, getGameDaySchema, getGameDaySchemaById } = require('./../schemas/gameDays.schema')

router.get('/', async (req, res, next) => {
  try {
    const gameDay = await service.find()
    res.json(gameDay)
  } catch (error) {
    next(error)
  }
})

router.get('/:name',
  validatorHandler(getGameDaySchema, 'params'),
  async (req, res, next) => {
    try {
      const { name } = req.params
      const gameDay = await service.findByName(name)
      res.json(gameDay)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createGameDaySchema, 'body'),
  async (req, res, next) => {
    try {
      const gameDay = await service.create(req.body)
      res.status(201).json(gameDay)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getGameDaySchemaById, 'params'),
  validatorHandler(updateGameDaySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      res.status(201).json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getGameDaySchemaById, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { name } = await service.findById(id)
      await service.delete(id, name)
      res.json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
