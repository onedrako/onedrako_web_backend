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
  const role = req.body.role
  try {
    if (role !== 'admin') {
      next()
    } else {
      const tokenFromHeader = req.headers.authorization
      const token = tokenFromHeader.split(' ')[1]
      const payload = JWT.verify(token, config.jwtSecret)

      if (payload.role !== 'admin') {
        next(boom.unauthorized('You are not authorized'))
      }
      next()
    }
  } catch (error) {
    next(boom.unauthorized('You are not authorized'))
  }
}

module.exports = { checkAdminRole, checkAdminRoleForCreatingAdmin }
