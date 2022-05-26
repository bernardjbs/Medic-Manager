const seedUsers = require('./user-seeds');
const seedMedications = require('./medication-seeds');
const seedAdditions = require('./addition-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
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
