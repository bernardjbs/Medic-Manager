// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const User = require('./User');

// Initialize Medication model (table) by extending off Sequelize's Model class
class Medication extends Model { }

// set up fields and rules for Medication model
Medication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    medication_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
      validate: {
        isDecimal: true
      }
    }, 
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User, 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'medication',
  }
);

module.exports = Medication;
