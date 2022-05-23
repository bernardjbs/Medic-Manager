const Users = require('../models/Users');

const galleryData = [
    {
      "username": "Sal",
      "password": "password12345"
    },
    {
      "username": "Lernantino",
      "password": "password12345"
    },
    {
      "username": "Amiko",
      "password": "password12345"
    },
    {
      "username": "Jordan",
      "password": "password12345"
    },
    {
      "username": "Blake",
      "password": "password12345"
    }
];

const seedUsers = () => Users.bulkCreate(galleryData);

module.exports = seedUsers;