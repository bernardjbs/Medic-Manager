const { Model, DataTypes } = require('sequelize');

// Import our sequelize connection to run this model
const sequelize = require('../config/connection');

// Create model through constructor
class Medications extends Model {}


Medications.init(
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
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
          },
      },
      tags_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tags',
            key: 'id',
          },
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'medications',
    }
  );

  module.exports = Medications