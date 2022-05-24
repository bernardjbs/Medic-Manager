const sequelize = require('../config/connection');

// Here is where all the seeds are synced through sequelize, and put into their respective table to be used as information in some manner.

// Import the data to be used in the tables.
const seedTags = require('./tagsData');
const seedUsers = require('./usersData');
const seedMedications = require('./medsData');
const seedAdditions = require('./additionsData');


const seedAll = async () => {
  // Set foreign key checks to zero so we can wipe the database and reseed
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function(){
      // Wipe the databse
      return sequelize.sync({ force: true });
  })
  .then(function(){
      // Set foreign key checks back for future use
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  })
  .then(function(){
      console.log('Database synchronised.');
  }, function(err){
      console.log(err);
  });

  await seedTags();
  
  await seedUsers();
  
  await seedMedications();

  await seedAdditions();

  process.exit(0);
};

// Run operation
seedAll();
