const { Game, GameSchema } = require('./game.model')
const { GameDay, GameDaySchema } = require('./gameDay.model')
const { Schedule, ScheduleSchema } = require('./schedule.model')
const { User, UserSchema } = require('./user.model')

const setupModels = (sequelize) => {
  Game.init(GameSchema, Game.config(sequelize))
  GameDay.init(GameDaySchema, GameDay.config(sequelize))
  Schedule.init(ScheduleSchema, Schedule.config(sequelize))
  User.init(UserSchema, User.config(sequelize))

  Game.associate(sequelize.models)
  GameDay.associate(sequelize.models)
  Schedule.associate(sequelize.models)
}

module.exports = setupModels
