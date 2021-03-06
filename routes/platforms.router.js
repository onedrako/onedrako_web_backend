const express = require('express')
const router = express.Router()

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('../middlewares/checkRole.handler')
const { getPlatformSchema, createPlatformSchema } = require('./../schemas/platforms.schema')
const { boom } = require('@hapi/boom')
const passport = require('passport')

const PlatformService = require('./../services/platform.service')
const service = new PlatformService()

router.get('/', async (req, res, next) => {
  try {
    const platforms = await service.findAll()
    res.json(platforms)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getPlatformSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const platform = await service.findOne(id)
      if (!platform) {
        throw boom.notFound('Platform not found in database')
      }
      res.json(platform)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createPlatformSchema, 'body'),
  async (req, res, next) => {
    try {
      const platform = await service.create(req.body)
      res.status(201).json(platform)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
