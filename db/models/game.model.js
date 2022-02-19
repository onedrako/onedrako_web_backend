const { Model, DataTypes, Sequelize } = require('sequelize')

const GAME_TABLE = 'games'

const GameSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  largeImage: {
    allowNull: false,
    type: DataTypes.STRING
  },
  boxImage: {
    allowNull: false,
    type: DataTypes.STRING
  },
  available: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  keywords: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}
class Game extends Model {
  static associate (models) {
    this.hasMany(models.GameDay,
      {
        as: 'gameDays',
        foreignKey: 'gameId'
      })

    this.belongsToMany(models.Platform,
      {
        as: 'platforms',
        through: models.GamePlatform,
        foreignKey: 'gameId',
        otherKey: 'platformId'
      })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: GAME_TABLE,
      modelName: 'Game',
      timestamps: false
    }
  }
}

module.exports = { Game, GameSchema, GAME_TABLE }
