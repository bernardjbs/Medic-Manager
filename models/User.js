const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    user_first_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    user_last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
