const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const time = Joi.any()
const gameDayId = Joi.array().items(Joi.number().integer())

const createScheduleSchema = Joi.object({
  name: name.required(),
  time: time.required(),
  gameDayId: gameDayId
})

const updateScheduleSchema = Joi.object({
  name: name.required(),
  time: time.required(),
  gameDayId: gameDayId
})

const getScheduleSchema = Joi.object({
  id: id.required()
})

module.exports({ createScheduleSchema, updateScheduleSchema, getScheduleSchema })
