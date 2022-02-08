const express = require('express')
const router = express.Router()

const validatorHandler = require('../utils/middlewares')
const { checkAdminRole } = require('../middlewares/checkRole.handler')
const { getPlatformsSchema, createPlatformSchema } = require('./../schemas/platforms.schema')
const { models } = require('../libs/sequelize')
const { boom } = require('@hapi/boom')

router.get('/', async (req, res, next) => {
  try {
    const platforms = await models.Platform.findAll()
    res.json(platforms)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  getPlatformsSchema,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const platform = await models.Platform.findByPk(id)
      if (!platform) {
        throw boom.notFound('Platform not found in database')
      }
      res.json(platform)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  checkAdminRole,
  validatorHandler(createPlatformSchema, 'body'),
  async (req, res, next) => {
    try {
      const platform = await models.Platform.create(req.body)
      res.status(201).json(platform)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
