const { ValidationError } = require('sequelize')

const logErrors = (error, req, res, next) => {
  console.log(error)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

const boomErrorHandler = (error, req, res, next) => {
  if (error.boom) {
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  } else {
    next(error)
  }
}

const ormErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).json({
      statusCode: 409,
      message: error.message,
      errors: error.errors
    })
  }
  next(error)
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
