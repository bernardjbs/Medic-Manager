const { Model, DataTypes } = require('sequelize');

// Import our sequelize connection to run this model
const sequelize = require('../config/connection');

// Create model through constructor
class Tags extends Model {}

// Tags will a reference between additions created by the user, the user this belongs too, and and any medications the users has information inserted into this column for

// EG 
// User: Dave (id: 1)
// Medication: Panadol (id: 4)
// Addition: Pharmacy (id: 2)

Tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // Store the value that this tag will hold
      value: {
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
      medication_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'medications',
            key: 'id',
          },
      },
      addition_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'additions',
            key: 'id',
          },
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'tags',
    }
  );

  module.exports = Tags