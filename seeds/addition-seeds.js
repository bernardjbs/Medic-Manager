const { Addition } = require('../models');

const AdditionData = [
  {
    medication_id: 1,
    label: 'Pharmacy',
    value: 'Mt. Lawley',
  },
  {
    medication_id: 2,
    label: 'Frequency',
    value: 'Twice a Day',
  },
  {
    medication_id: 3,
    label: 'When',
    value: 'After Meal',
  },
  {
    medication_id: 4,
    label: 'Side effects',
    value: 'Dizzy',
  },
  {
    medication_id: 5,
    label: 'Treatment Until',
    value: 'Lifetime',
  },
];

const seedAdditions = () => Addition.bulkCreate(AdditionData);

module.exports = seedAdditions;
