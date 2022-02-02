const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class GameService {
  async find () {
    const response = await models.Game.findAll()
    if (!response) {
      throw boom.notFound('There are not games created in the database')
    }
    return response
  }

  async findByName (name) {
    const game = await models.Game.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })

    if (!game) {
      throw boom.notFound('Game not found in database')
    }
    return game
  }

  async findById (id) {
    const game = await models.Game.findByPk(id)
    if (!game) {
      throw boom.notFound('Game not found in database')
    }
    return game
  }

  async findByAvailability () {
    const availableGames = await models.Game.findAll({
      order: [['available', 'DESC']]
    })
    if (!availableGames) {
      throw boom.notFound('There are not games created in the database')
    }
    return availableGames
  }

  async create (data) {
    const response = await models.Game.create(data)
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
