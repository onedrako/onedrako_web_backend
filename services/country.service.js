const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class CountryService {
  async create (data) {
    const response = await models.Country.create(data)
    return response
  }

  async find () {
    const response = await models.Country.findAll()
    if (!response) {
      throw boom.notFound('There are not countries created in the database')
    }
    return response
  }

  async findOne (id) {
    const country = await models.Country.findByPk(id, {
      include: ['schedule']
    })
    if (!country) {
      throw boom.notFound('Country not found in database')
    }
    return country
  }

  async updateById (id, data) {
    const country = await models.Country.findByPk(id)
    if (!country) {
      throw boom.notFound('Country not found in database')
    }
    const response = await country.update(data)
    return response
  }
}

module.exports = CountryService
