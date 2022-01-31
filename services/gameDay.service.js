const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class GameDayService {
  async find () {
    const response = await models.GameDay.findAll()
    if (!response) {
      throw boom.notFound('There are game days created in the database')
    }
    return response
  }

  async findByName (name) {
    const gameDay = await models.GameDay.findOne({
      where: { name }
    })

    if (!gameDay) {
      throw boom.notFound('Game day not found in database')
    }
    return gameDay
  }

  async create (data) {
    const response = await models.GameDay.create(data)
    return response
  }

  async update (day, changes) {
    const gameDay = await this.findOne({
      where: { day }
    })
    if (!gameDay) {
      throw boom.notFound(` ${day} was not found in database`)
    }
    const response = await gameDay.update(changes)
    return response
  }

  async delete (day) {
    if (
      day === 'Lunes' |
      day === 'Martes' |
      day === 'Miercoles' |
      day === 'Jueves' |
      day === 'Viernes' |
      day === 'Sabado' |
      day === 'Domingo') {
      throw boom.badRequest('You can not delete a day of the week')
    }
    const gameDay = await this.findOne({
      where: { day }
    })
    const response = await gameDay.destroy()
    return response
  }
}

module.exports = GameDayService
