const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const description = Joi.string()
const image = Joi.string()
const gameDayId = Joi.array().items(Joi.number().integer())

const createGameSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  description: description.required(),
  image: image.required(),
  gameDayId: gameDayId
})

const updateGameSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  gameDayId: gameDayId
})

const getGameSchema = Joi.object({
  id: id.required()
})

module.exports = { createGameSchema, updateGameSchema, getGameSchema }
