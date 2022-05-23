const Sequelize = require('sequelize');
require('dotenv').config();

// create server for seqwuelize to sit on for connection to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    // Port 3306 being used by sequelize
    port: 3306,
  }
);

module.exports = sequelize;
