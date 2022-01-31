const Joi = require('joi')

const id = Joi.number().integer()
const nickName = Joi.string()
const email = Joi.string()
const password = Joi.string()
const role = Joi.string()

const createUserSchema = Joi.object({
  id: id.optional(),
  nickName: nickName.required().min(6),
  email: email.required(),
  password: password.required().min(8),
  role: role.required().default('user')
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, getUserSchema }
