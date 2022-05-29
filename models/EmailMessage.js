const { datacatalog } = require('googleapis/build/src/apis/datacatalog');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

const User = require('./User');

class EmailMessage extends Model {}

EmailMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    content: {
      type: DataTypes.TEXT, 
      allowNull: false, 
    }, 
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: {
        model: User, 
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: false,
    createdAt: 'created_at',
    underscored: true,
    modelName: 'emailMessage',
  }
);

module.exports = EmailMessage;