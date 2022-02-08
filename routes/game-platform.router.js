const express = require('express')
const router = express.Router()

const validatorHandler = require('../utils/middlewares')
const { checkAdminRole } = require('../middlewares/checkRole.handler')
const { models } = require('../libs/sequelize')
const { boom } = require('@hapi/boom')
const { createGamePlatform } = require('../services/game-platform.service')

router.get('/',
  async (req, res, next) => {
    try {
      const platforms = await models.Platform.createGamePlatform()
      res.json(platforms)
    } catch (error) {
      throw boom.notFound('Platform not found in database')
    }
  })

router.post('/',
  checkAdminRole,
  validatorHandler(createGamePlatform, 'body'),
  async (req, res, next) => {
    try {
      const platform = await models.Platform.create(req.body)
      res.status(201).json(platform)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
