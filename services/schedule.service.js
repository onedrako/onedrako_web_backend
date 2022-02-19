const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class ScheduleService {
  async find () {
    const response = await models.Schedule.findAll()
    if (!response) {
      throw boom.notFound('There are not schedules created')
    }
    return response
  }

  async findBySchedule (name) {
    const schedule = await models.Schedule.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: ['countries', 'gameDays']
    })
    if (!schedule) {
      throw boom.notFound('Schedule not found')
    }
    return schedule
  }

  async create (data) {
    const response = await models.Schedule.create(data)
    return response
  }

  async update (name, changes) {
    const schedule = await models.Schedule.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: ['gameDays']
    })
    if (!schedule) {
      throw boom.notFound('Schedule not found')
    }
    const response = await schedule.update(changes)
    return response
  }

  async delete (name) {
    const schedule = await models.Schedule.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })
    if (!schedule) {
      throw boom.notFound('Schedule not found')
    }
    const response = await schedule.destroy()
    return response
  }
}

module.exports = ScheduleService
