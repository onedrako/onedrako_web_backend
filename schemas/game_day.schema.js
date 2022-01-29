const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const shortName = Joi.string()
const state = Joi.boolean()
const gameId = Joi.number().integer()
const scheduleId = Joi.number().integer()

const createGameDaySchema = Joi.object({
  id: id.optional(),
  name: name.required(),
  shortName: shortName.required(),
  state: state.required(),
  gameId: gameId.required(),
  scheduleId: scheduleId
})

const updateGameDaySchema = Joi.object({
  name: name,
  state: state,
  gameId: gameId,
  scheduleId: scheduleId
})

const getGameDaySchema = Joi.object({
  id: id.required()
})

module.exports = { createGameDaySchema, updateGameDaySchema, getGameDaySchema }
