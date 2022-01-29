const { Model, dataTypes, Sequelize } = require('sequelize')

const GAME_TABLE = 'games'

const GameSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: dataTypes.INTEGER
  },
  name: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: dataTypes.STRING,
    allowNull: false
  },
  image: {
    type: dataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: dataTypes.DATE,
    field: 'created_at',
    allowNull: false
  },
  gameDayId: {
    type: dataTypes.ARRAY(dataTypes.INTEGER),
    field: 'game_day_id',
    allowNull: true
  }

}
