const boom = require('@hapi/boom')
const { config } = require('../config/config')

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api-key']
  if (apiKey !== config.apiKey) {
    next()
  } else {
    next(boom.unauthorized('Invalid API Key'))
  }
}

const checkAdminRole = (req, res, next) => {
  const user = req.user
  if (user.role === 'admin') {
    next()
  } else {
    next(boom.unauthorized('You are not authorized'))
  }
}

module.exports = { checkApiKey, checkAdminRole }
