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
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  available: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  platforms: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING)
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
    this.hasMany(models.GameDay, { as: 'gameDays', foreignKey: 'gameId' })
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
