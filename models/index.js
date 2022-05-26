// import models
const Medication = require('./Medication');
const User = require('./User');
const Addition = require('./Addition');

// Medications belongsTo User
Medication.belongsTo(User, {
  foreignKey: 'user_id'
});

// Categories have many Medications
User.hasMany(Medication, {
  foreignKey: 'user_id'
});

Addition.belongsTo(Medication, {
  foreignKey: 'medication_id'
})

Medication.hasMany(Addition, {
  foreignKey: 'medication_id'
})

module.exports = {
  Medication,
  User,
  Addition,
};
