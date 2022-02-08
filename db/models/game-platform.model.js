const { Model, DataTypes, Sequelize } = require('sequelize')
const { GAME_TABLE } = require('./game.model')
const { PLATFORM_TABLE } = require('./platforms.model')

const GAME_PLATFORM_TABLE = 'games_platforms_model'

const GamePlatformSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  gameId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GAME_TABLE,
      key: 'id'
    }
  },
  platformId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PLATFORM_TABLE,
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class GamePlatform extends Model {
  static associate () {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: GAME_PLATFORM_TABLE,
      modelName: 'GamePlatform',
      timestamps: false
    }
  }
}

module.exports = { GamePlatform, GamePlatformSchema, GAME_PLATFORM_TABLE }
