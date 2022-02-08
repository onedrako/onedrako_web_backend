'use strict'

const { USER_TABLE } = require('./../models/user.model')
const { GAME_DAY_TABLE } = require('./../models/gameDay.model')
const { GAME_TABLE } = require('./../models/game.model')
const { SCHEDULE_TABLE } = require('./../models/schedule.model')
const { COUNTRY_TABLE } = require('./../models/country.model')
const { PLATFORM_TABLE } = require('./../models/platform.model')
const { GAME_PLATFORM_TABLE } = require('./../models/game-platform.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nickName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        min: 8
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'user'
      },
      recoveryToken: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(GAME_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      available: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      platforms: {
        allowNull: false,
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING)
      },
      keywords: {
        allowNull: true,
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(SCHEDULE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      initialTime: {
        allowNull: false,
        type: Sequelize.DataTypes.TIME
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DataTypes.TIME
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(GAME_DAY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      shortName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      state: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      gameId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        field: 'schedule_id',
        references: {
          model: SCHEDULE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })

    await queryInterface.createTable(COUNTRY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      code: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      flag: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      scheduleId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(PLATFORM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      img: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(GAME_PLATFORM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      gameId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GAME_TABLE,
          key: 'id'
        }
      },
      platformId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PLATFORM_TABLE,
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(GAME_DAY_TABLE)
    await queryInterface.dropTable(GAME_TABLE)
    await queryInterface.dropTable(SCHEDULE_TABLE)
    await queryInterface.dropTable(COUNTRY_TABLE)
    await queryInterface.dropTable(PLATFORM_TABLE)
    await queryInterface.dropTable(GAME_PLATFORM_TABLE)
  }
}
