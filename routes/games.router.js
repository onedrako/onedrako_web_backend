const express = require('express')
const validatorHandler = require('../middlewares/validator.handler')
const { checkAdminRole } = require('../middlewares/checkRole.handler')
const passport = require('passport')

const GameService = require('./../services/game.service')

const router = express.Router()
const service = new GameService()
const { createGameSchema, updateGameSchema, getGameSchema, getGameSchemaById } = require('./../schemas/games.schema')

router.get('/', async (req, res, next) => {
  try {
    const game = await service.find()
    res.json(game)
  } catch (error) {
    next(error)
  }
})

router.get('/search/:name',
  validatorHandler(getGameSchema, 'params'),
  async (req, res, next) => {
    try {
      const { name } = req.params
      const game = await service.findByName(name)
      res.json(game)
    } catch (error) {
      next(error)
    }
  })

router.get('/all',
  async (req, res, next) => {
    try {
      const games = await service.findByAvailability()
      res.json(games)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createGameSchema, 'body'),
  async (req, res, next) => {
    try {
      const game = await service.create(req.body)
      res.status(201).json(game)
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getGameSchemaById, 'params'),
  validatorHandler(updateGameSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const game = await service.findById(id)
      const originalKeywords = [...game.keywords]

      const { keywords } = req.body

      if (keywords) {
        keywords.forEach(async keyword => {
          if (!originalKeywords.includes(keyword)) {
            originalKeywords.push(keyword)
          }
        })
        const dataToUpdate = { ...req.body, keywords: originalKeywords }
        const gameUpdate = await service.update(id, dataToUpdate)
        res.json(gameUpdate)
      } else {
        const gameUpdate = await service.update(id, req.body)
        res.json(gameUpdate)
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),

  checkAdminRole,
  validatorHandler(getGameSchemaById, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
