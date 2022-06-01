// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const EmailMessage = require('./EmailMessage');
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
    med_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    med_price: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
      validate: {
        isDecimal: true
      },
    },  
    med_type: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    med_date_acquired: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    med_script_renewed: {
      type: DataTypes.DATE,
      allowNull: true
    }, 
    med_exp_date: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    exp_notification_sent: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User, 
        key: 'id'
      },
    },
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
