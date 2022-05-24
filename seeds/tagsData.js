const Tags = require('../models/Tags');

const tagsData = [
    // Specify table information (according to models)
    {
        // The value being held
        "value": "Instil Pharma",
        // Reference the user ID
        "user_id": 1,
        // Reference the medication ID
        "medication_id": 4,
        // Reference the addition ID
        "medication_id": 4,
    },
];

const seedTags = () => Tags.bulkCreate(tagsData);

module.exports = seedTags;