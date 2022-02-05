const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt')

class UserService {
  async find () {
    const response = await models.User.findAll()
    if (!response) {
      throw boom.notFound('There are not users created')
    }
    return response
  }

  async findByNickName (nickName) {
    const user = await models.User.findOne({
      where: { nickName }
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findByEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })

    return user
  }

  async findById (id) {
    const user = await models.User.findOne({
      where: { id }
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async create (data) {
    const hash = await bcrypt.hash(data.password, 10)
    const response = await models.User.create({
      ...data,
      password: hash
    })
    delete response.dataValues.password
    return response
  }

  async update (id, data) {
    const user = await models.User.findOne({
      where: { id }
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    const response = await user.update(data)
    delete response.dataValues.password
    return response
  }
}

module.exports = UserService
