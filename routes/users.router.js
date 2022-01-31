const express = require('express')

const UserService = require('../services/user.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createUserSchema, getUserSchema } = require('../schemas/users.schema')

const router = express.Router()
const service = new UserService()

router.get('/',
  validatorHandler(getUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = await service.find(req.query)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
