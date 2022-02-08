const { Model, DataTypes, Sequelize } = require('sequelize')
const { SCHEDULE_TABLE } = require('./schedule.model')

const COUNTRIES_TABLE = 'countries'

const countrySchema = {
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
  code: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  flag: {
    allowNull: false,
    type: DataTypes.STRING
  },
  scheduleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'schedule_id',
    references: {
      model: SCHEDULE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Country extends Model {
  static associate (models) {
    this.belongsTo(models.Schedule, { as: 'schedule' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: COUNTRIES_TABLE,
      modelName: 'Country',
      timestamps: false
    }
  }
}

module.exports = { Country, countrySchema, COUNTRIES_TABLE }
