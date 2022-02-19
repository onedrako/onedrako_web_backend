const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const shortName = Joi.string()
const state = Joi.boolean()
const sponsor = Joi.string()
const gameId = Joi.number().integer()
const scheduleId = Joi.number().integer()
const date = Joi.date()

const createGameDaySchema = Joi.object({
  name: name.required(),
  shortName: shortName.required(),
  state: state.required().default(true),
  sponsor: sponsor.default(null),
  gameId: gameId.required(),
  date: date.required(),
  scheduleId: scheduleId
})

const updateGameDaySchema = Joi.object({
  name: name,
  state: state,
  sponsor: sponsor,
  gameId: gameId,
  date: date,
  scheduleId: scheduleId
})

const getGameDaySchema = Joi.object({
  name: name.required()
})

const getGameDaySchemaById = Joi.object({
  id: id.required()
})

module.exports = { createGameDaySchema, updateGameDaySchema, getGameDaySchema, getGameDaySchemaById }
