const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const description = Joi.string()
const largeImage = Joi.string()
const boxImage = Joi.string()
const available = Joi.boolean()
const keywords = Joi.array().items(Joi.string())

const createGameSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  largeImage: largeImage.required(),
  boxImage: boxImage.required(),
  available: available.required().default(true),
  keywords: keywords.default([])
})

const updateGameSchema = Joi.object({
  name: name,
  description: description,
  largeImage: largeImage,
  boxImage: boxImage,
  available: available,
  keywords: keywords
})

const getGameSchema = Joi.object({
  name: name.required()
})

const getGameSchemaById = Joi.object({
  id: id.required()
})

module.exports = { createGameSchema, updateGameSchema, getGameSchema, getGameSchemaById }
