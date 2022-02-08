const { models } = require('../libs/sequelize')
const { boom } = require('@hapi/boom')

class GamePlatformService {
  async createGamePlatform (data) {
    const newPlatformGame = await models.GamePlatform.create(data)
    return newPlatformGame
  }

  async findAllGamePlatforms () {
    const gamePlatforms = await models.GamePlatform.findAll()
    if (!gamePlatforms) {
      throw boom.notFound('There are not game platforms created in the database')
    }
    return gamePlatforms
  }
}

module.exports = GamePlatformService
