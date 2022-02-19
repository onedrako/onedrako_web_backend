const express = require('express')
const router = express.Router()

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/checkRole.handler')
const { boom } = require('@hapi/boom')
const { createGamePlatformSchema, deleteGamePlatformSchema } = require('./../schemas/game-platform.schema')
const GamePlatformService = require('../services/game-platform.service')
const passport = require('passport')

const service = new GamePlatformService()

router.get('/',
  async (req, res, next) => {
    try {
      const platforms = await service.findAllGamePlatforms()
      res.json(platforms)
    } catch (error) {
      throw boom.notFound('Platform not found in database')
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createGamePlatformSchema, 'body'),
  async (req, res, next) => {
    try {
      const platform = await service.createGamePlatform(req.body)
      res.status(201).json(platform)
    } catch (error) {
      next(error)
    }
  })

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(deleteGamePlatformSchema, 'params'),
  async (req, res, next) => {
    try {
      const platform = await service.deleteById(req.params.id)
      res.json(platform)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
