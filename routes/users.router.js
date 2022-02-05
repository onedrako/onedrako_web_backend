const express = require('express')

const UserService = require('../services/user.service')

const { checkAdminRole, checkAdminRoleForCreatingAdmin } = require('../middlewares/checkRole.handler')
const validatorHandler = require('../middlewares/validator.handler')
const passport = require('passport')

const { createUserSchema, getUserSchema } = require('../schemas/users.schema')

const router = express.Router()
const service = new UserService()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
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
  passport.authenticate('jwt', { session: false }),
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

router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user.sub
      const profile = await service.findById(user)
      res.json(profile)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  checkAdminRoleForCreatingAdmin,
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
