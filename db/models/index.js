const { Game, GameSchema } = require('./game.model')
const { GameDay, GameDaySchema } = require('./gameDay.model')
const { Schedule, ScheduleSchema } = require('./schedule.model')
const { User, UserSchema } = require('./user.model')
const { Country, CountrySchema } = require('./countries.model')
const { Platform, PlatformSchema } = require('./platforms.model')
const { GamePlatform, GamePlatformSchema } = require('./game-platform.model')

const setupModels = (sequelize) => {
  Game.init(GameSchema, Game.config(sequelize))
  GameDay.init(GameDaySchema, GameDay.config(sequelize))
  Schedule.init(ScheduleSchema, Schedule.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Country.init(CountrySchema, Country.config(sequelize))
  Platform.init(PlatformSchema, Platform.config(sequelize))
  GamePlatform.init(GamePlatformSchema, GamePlatform.config(sequelize))

  Game.associate(sequelize.models)
  GameDay.associate(sequelize.models)
  Schedule.associate(sequelize.models)
  Country.associate(sequelize.models)
  Platform.associate(sequelize.models)
  GamePlatform.associate(sequelize.models)
}

module.exports = setupModels
