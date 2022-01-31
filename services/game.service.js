const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class GameService {
  async find () {
    const response = await models.User.findAll()
    if (!response) {
      throw boom.notFound('There are not games created in the database')
    }
    return response
  }

  async findByName (name) {
    const game = await models.User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })

    if (!game) {
      throw boom.notFound('Game not found in database')
    }
    return game
  }

  async findByAvailability () {
    const availableGames = await models.User.findAll({
      where: {
        available: true
      }
    })
    const unavailableGames = await models.User.findAll({
      where: {
        available: false
      }
    })

    const allGames = { ...availableGames, ...unavailableGames }

    if (!allGames) {
      throw boom.notFound('There are not games created in the database')
    }
    return allGames
  }

  async create (data) {
    const response = await models.User.create(data)
    return response
  }

  async update (id, changes) {
    const game = await this.findById(id)
    const response = await game.update(changes)
    return response
  }

  async delete (id) {
    const game = await this.findById(id)
    await game.destroy()
    return { id }
  }
}

module.exports = GameService
