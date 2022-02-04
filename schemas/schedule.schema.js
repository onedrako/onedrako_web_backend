const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const initialTime = Joi.any()
const endTime = Joi.any()

const createScheduleSchema = Joi.object({
  name: name.required(),
  initialTime: initialTime.required(),
  endTime: endTime.required()
})

const updateScheduleSchema = Joi.object({
  name: name,
  initialTime: initialTime,
  endTime: endTime
})

const getScheduleSchema = Joi.object({
  name: name.required()
})

module.exports = ({ createScheduleSchema, updateScheduleSchema, getScheduleSchema })
