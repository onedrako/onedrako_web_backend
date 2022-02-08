const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const img = Joi.string()

const getPlatformSchema = Joi.object({
  id: id.required()
})

const createPlatformSchema = Joi.object({
  name: name.required(),
  img: img.required()
})

module.exports = { getPlatformSchema, createPlatformSchema }
