const { Model, DataTypes, Sequelize } = require('sequelize')

const SCHEDULE_TABLE = 'schedules'

const ScheduleSchema = {
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
  initialTime: {
    allowNull: false,
    type: DataTypes.TIME
  },
  endTime: {
    allowNull: false,
    type: DataTypes.TIME
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Schedule extends Model {
  static associate (models) {
    this.hasMany(models.GameDay, { as: 'gameDays', foreignKey: 'scheduleId' })
    this.hasMany(models.Country, { as: 'countries', foreignKey: 'scheduleId' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: 'Schedule',
      timestamps: false
    }
  }
}

module.exports = { Schedule, ScheduleSchema, SCHEDULE_TABLE }
