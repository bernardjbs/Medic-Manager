const { User } = require('../models');

const userData = [
  {
    username: 'MrBlack',
  },
  {
    username: 'MrPink',
  },
  {
    username: 'MrWhite',
  },
  {
    username: 'MrWolf',
  },
  {
    username: 'MrFox',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
