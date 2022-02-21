const express = require('express')
const router = express.Router()

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/checkRole.handler')
const { createCountrySchema, getCountrySchema, updateCountrySchema } = require('./../schemas/countries.schema')
const passport = require('passport')

const CountryService = require('./../services/country.service')
const service = new CountryService()

router.get('/',
  async (req, res, next) => {
    try {
      const countries = await service.find()
      res.json(countries)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getCountrySchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const country = await service.findOne(id)
      res.json(country)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createCountrySchema, 'body'),
  async (req, res, next) => {
    try {
      const country = await service.create(req.body)
      res.status(201).json(country)
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getCountrySchema, 'params'),
  validatorHandler(updateCountrySchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id
      const country = await service.updateById(id, req.body)
      res.json(country)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
