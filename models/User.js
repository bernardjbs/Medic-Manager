const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Was removed
const sequelize = require('../config/connection.js');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
} // was removed

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
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    }, // Was removed
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
