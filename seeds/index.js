const seedUsers = require('./user-seeds');
const seedMedications = require('./medication-seeds');
const seedAdditions = require('./addition-seeds');

const sequelize = require('../config/connection');

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
  
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- Users SEEDED -----\n');

  await seedMedications();
  console.log('\n----- Medications SEEDED -----\n');

  await seedAdditions();
  console.log('\n----- medication TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
