const { User } = require('../models');

const userData = [
  {
    user_email: 'bernardjbs@yahoo.com',
    user_first_name: 'Bernard', 
    user_last_name: 'Sin Fat', 
    password: 'tobehashed'
  },
  {
    user_email: 'pink@colors.com',
    user_first_name: 'Pinky', 
    user_last_name: 'Rabbit', 
    password: 'tobehashed'
  },
  {
    user_email: 'black@colors.com',
    user_first_name: 'Black', 
    user_last_name: 'Hole', 
    password: 'tobehashed'
  },
  {
    user_email: 'blue@colors.com',
    user_first_name: 'Blue', 
    user_last_name: 'Sky', 
    password: 'tobehashed'
  },
  {
    user_email: 'green@colors.com',
    user_first_name: 'Green', 
    user_last_name: 'Forest', 
    password: 'tobehashed'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
