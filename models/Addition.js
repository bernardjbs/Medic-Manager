const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Medication = require('./Medication');

class Addition extends Model { }

Addition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    medication_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Medication, 
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'addition',
  }
);

module.exports = Addition;
