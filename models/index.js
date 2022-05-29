// import models
const Medication = require('./Medication');
const User = require('./User');
const Addition = require('./Addition');
const EmailMessage = require('./EmailMessage');

// Relationship between Medication and User
Medication.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasMany(Medication, {
  foreignKey: 'user_id'
});

// Relationship between Addition and Medication
Addition.belongsTo(Medication, {
  foreignKey: 'medication_id'
});
Medication.hasMany(Addition, {
  foreignKey: 'medication_id'
});

// Relationship between User and EmailMessage
EmailMessage.belongsTo(User, {
  foreignKey: 'user_id'
});
User.hasOne(EmailMessage, {
  foreignKey: 'user_id'
});



module.exports = {
  Medication,
  User,
  Addition,
  EmailMessage,
};
