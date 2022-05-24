const Additions = require('../models/Additions');


const additionsData = [
    {
    },
];

const seedAdditions = () => Additions.bulkCreate(additionsData);

module.exports = seedAdditions;