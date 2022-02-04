const boom = require('@hapi/boom')
const { config } = require('./../config/config')
const JWT = require('jsonwebtoken')

const checkAdminRole = (req, res, next) => {
  const user = req.user
  if (user.role === 'admin') {
    next()
  } else {
    next(boom.unauthorized('You are not authorized'))
  }
}

const checkAdminRoleForCreatingAdmin = async (req, res, next) => {
  if (req.body.role !== 'admin') {
    next()
  } else {
    if (!req.headers.authorization) {
      next(boom.unauthorized('You are not authorized'))
    } else {
      const tokenFromHeader = req.headers.authorization

      const token = tokenFromHeader.split(' ')[1]

      const verifyToken = (token, secret) => {
        return JWT.verify(token, secret)
      }
      try {
        const payload = verifyToken(token, config.jwtSecret)
        if (!payload) {
          next(boom.unauthorized('You are not authorized'))
        } else {
          console.log(payload)
          if (payload.role === 'admin') {
            next()
          } else {
            next(boom.unauthorized('You are not authorized'))
          }
        }
      } catch (error) {
        next(boom.unauthorized('You are not authorized'))
      }
    }
  }
}

module.exports = { checkAdminRole, checkAdminRoleForCreatingAdmin }
