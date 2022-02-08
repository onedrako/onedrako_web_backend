const Joi = require('joi')

const gameId = Joi.number().integer()
const platformId = Joi.number().integer()

const createGamePlatformSchema = Joi.object({
  gameId: gameId.required(),
  platformId: platformId.required()
})

const updateGamePlatformSchema = Joi.object({
  gameId: gameId,
  platformId: platformId
})

module.exports = { createGamePlatformSchema, updateGamePlatformSchema }
