const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const code = Joi.string()
const flag = Joi.string()
const scheduleId = Joi.number().integer()

const getCountrySchema = Joi.object({
  id: id.required()
})

const createCountrySchema = Joi.object({
  name: name.required(),
  code: code.required(),
  flag: flag.required(),
  scheduleId: scheduleId.required()
})

const updateCountrySchema = Joi.object({
  name: name,
  code: code,
  flag: flag,
  scheduleId: scheduleId
})

module.exports = { getCountrySchema, createCountrySchema, updateCountrySchema }
