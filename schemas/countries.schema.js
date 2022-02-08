const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const img = Joi.string()

const getCountrySchema = Joi.object({
  id: id.required()
})

const createCountrySchema = Joi.object({
  name: name.required(),
  img: img.required()
})

module.exports = { getCountrySchema, createCountrySchema }
