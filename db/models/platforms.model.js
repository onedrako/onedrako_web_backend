const { Model, DataTypes, Sequelize } = require('sequelize')

const PLATFORM_TABLE = 'platforms'

const PlatformSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  img: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Platform extends Model {
  static associate (models) {
    this.belongsTo(models.Game, { as: 'game' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PLATFORM_TABLE,
      modelName: 'Platform',
      timestamps: false
    }
  }
}

module.exports = { Platform, PlatformSchema, PLATFORM_TABLE }
