const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Additions extends Model {}

Additions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medications_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'medications',
            key: 'id',
          },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
          },
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'additions',
    }
  );

module.exports = Additions