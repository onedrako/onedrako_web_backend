const { Model, DataTypes, Sequelize } = require('sequelize')
const { GAME_TABLE } = require('./game.model')
const { SCHEDULE_TABLE } = require('./schedule.model')

const GAME_DAY_TABLE = 'game_days'

const GameDaySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  shortName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  date: {
    allowNull: true,
    type: DataTypes.DATE
  },
  state: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sponsor: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  gameId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'game_id',
    references: {
      model: GAME_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  scheduleId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'schedule_id',
    references: {
      model: SCHEDULE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class GameDay extends Model {
  static associate (models) {
    this.belongsTo(models.Game, { as: 'game' })
    this.belongsTo(models.Schedule, { as: 'schedule' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: GAME_DAY_TABLE,
      modelName: 'GameDay',
      timestamps: false
    }
  }
}

module.exports = { GameDay, GameDaySchema, GAME_DAY_TABLE }
