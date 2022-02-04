const express = require('express')
const router = express.Router()

const validatorHandler = require('../middlewares/validator.handler')
const { checkAdminRole } = require('../middlewares/checkRole.handler')
const passport = require('passport')

const ScheduleService = require('../services/schedule.service')

const service = new ScheduleService()
const { createScheduleSchema, updateScheduleSchema, getScheduleSchema } = require('../schemas/schedule.schema')

router.get('/',
  async (req, res, next) => {
    try {
      const schedules = await service.find()
      res.json(schedules)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/:name',
  async (req, res, next) => {
    try {
      const { name } = req.params
      const schedule = await service.findBySchedule(name)
      res.json(schedule)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),

  checkAdminRole,
  validatorHandler(createScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const schedule = await service.create(req.body)
      res.status(201).json(schedule)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:name',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getScheduleSchema, 'params'),
  validatorHandler(updateScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { name } = req.params
      const body = req.body
      const schedule = await service.update(name, body)
      res.json(schedule)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:name',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { name } = req.params
      await service.delete(name)
      res.json({ name })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
