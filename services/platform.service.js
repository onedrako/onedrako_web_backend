const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class PlatformService {
  async create (data) {
    const response = await models.Platform.create(data)
    return response
  }

  async findAll () {
    const response = await models.Platform.findAll()
    if (!response) {
      throw boom.notFound('There are not platforms created in the database')
    }
    return response
  }

  async findByPk (id) {
    const platform = await models.Platform.findByPk(id, {
      include: ['games']
    })
    if (!platform) {
      throw boom.notFound('Platform not found in database')
    }
    return platform
  }
}

module.exports = PlatformService
