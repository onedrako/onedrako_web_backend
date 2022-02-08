const express = require('express')
const router = express.Router()

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/checkRole.handler')
const { boom } = require('@hapi/boom')
const { createCountrySchema, getCountrySchema } = require('./../schemas/countries.schema')

const CountryService = require('./../services/country.service')
const service = new CountryService()

router.get('/',
  async (req, res, next) => {
    try {
      const countries = await service.find()
      res.json(countries)
    } catch (error) {
      throw boom.notFound('Countries not found in database')
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
      throw boom.notFound('Country not found in database')
    }
  })

router.post('/',
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

module.exports = router
