const express = require('express')

const UserService = require('../services/user.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createUserSchema, getUserSchema } = require('../schemas/users.schema')

const router = express.Router()
const service = new UserService()

router.get('/',
  async (req, res, next) => {
    try {
      const user = await service.find(req.query)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/user/:nickName',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { nickName } = req.params
      const user = await service.findByNickName(nickName)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await service.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
