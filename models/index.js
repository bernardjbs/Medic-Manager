// Used to create relationships between tables

// Example Models (tables) imported for routing for use at end points (including for seeding them and extracting/imputing info)
const Users = require('./Users');
const Medications = require('./Medications');
const Additions = require('./Additions');
const Tags = require('./Tags');

// Relationships examples //

// Users will have one or more types of medications they may want to add besides the ones we have already determined.
Users.hasMany(Medications, {
  foreignKey: 'user_id',
});

Medications.belongsTo(Users, {
  foreignKey: 'user_id',
});

// Users will make one or more additions to a table that we have no already added
Users.hasMany(Additions, {
  foreignKey: 'user_id',
});

Additions.belongsTo(Users, {
  foreignKey: 'user_id',
});

// Users will make many additions to their pharmaceutical information
Users.hasMany(Tags, {
  foreignKey: 'user_id',
});

Tags.belongsTo(Users, {
  foreignKey: 'user_id',
})

// Medications will have additional information added that we have no specified which will be added by the user
Medications.hasMany(Additions, {
  foreignKey: 'medications_id',
});

// Medications will have one or more pieces of information from different medications, but not all. 
Medications.hasMany(Tags, {
  foreignKey: 'tags_id',
});
// and tags will have hold information from different medications.
Tags.hasMany(Medications, {
  foreignKey: 'medications_id',
});

Additions.belongsTo(Medications, {
  foreignKey: 'medications_id',
});

// Additions will hold one or more pieces of information from different medications
Additions.hasMany(Tags, {
  foreignKey: 'additions_id',
});
//and a tag will belong to one addition
Tags.belongsTo(Additions, {
  foreignKey: 'additions_id',
});

module.exports = { Users, Medications, Additions, Tags };
