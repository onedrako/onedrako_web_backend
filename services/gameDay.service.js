const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class GameDayService {
  async find () {
    const response = await models.GameDay.findAll({
      include: [
        'schedule',
        'game',
        {
          association: 'game',
          include: [{
            association: 'platforms'
          }]
        }
      ]
    })
    if (!response) {
      throw boom.notFound('There are not game days created in the database')
    }
    return response
  }

  async findByName (name) {
    const gameDay = await models.GameDay.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [
        'game',
        'schedule',
        {
          association: 'game',
          include: [{
            association: 'platforms'
          }]
        }
      ]
    })

    if (!gameDay) {
      throw boom.notFound('Game day not found in database')
    }
    return gameDay
  }

  async findById (id) {
    const model = await models.GameDay.findByPk(id)
    if (!model) {
      throw boom.notFound('Game day not found in database')
    }
    return model
  }

  async create (data) {
    const response = await models.GameDay.create(data)
    return response
  }

  async update (id, changes) {
    const model = await models.GameDay.findByPk(id)
    const rta = await model.update(changes)
    return rta
  }

  async delete (id, day) {
    console.log(day)
    if (
      day === 'Lunes' ||
      day === 'Martes' ||
      day === 'Miércoles' ||
      day === 'Jueves' ||
      day === 'Viernes' ||
      day === 'Sábado' ||
      day === 'Domingo') {
      throw boom.badRequest('You can not delete a day of the week')
    }
    const model = await models.GameDay.findByPk(id)
    const response = await model.destroy()
    return response
  }
}

module.exports = GameDayService
