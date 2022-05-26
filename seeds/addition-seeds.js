const { Addition } = require('../models');

const AdditionData = [
  {
    medication_id: 1,
    label: 'Pharmacy',
    value: 'Mt. Lawley',
  },
  {
    medication_id: 1,
    label: 'Frequency',
    value: 'Twice a Day',
  },
  {
    medication_id: 1,
    label: 'When',
    value: 'After Meal',
  },
  {
    medication_id: 2,
    label: 'Side effects',
    value: 'Dizzy',
  },
  {
    medication_id: 3,
    label: 'Treatment Until',
    value: 'Lifetime',
  },
  {
    medication_id: 3,
    label: 'Pharmacy Email',
    value: 'medic@pharm.com',
  },
  {
    medication_id: 3,
    label: 'Doctor',
    value: 'Wu',
  },
  {
    medication_id: 3,
    label: 'Purpose',
    value: 'Migrane',
  },
  {
    medication_id: 4,
    label: 'Food to Avoid',
    value: 'Banana',
  },
  {
    medication_id: 4,
    label: 'Generic Brand',
    value: 'Yes',
  },
  {
    medication_id: 4,
    label: 'Medicine Time',
    value: 'Morning',
  },
  {
    medication_id: 5,
    label: 'Conflict Medicine',
    value: 'Panadol',
  },
];

const seedAdditions = () => Addition.bulkCreate(AdditionData);

module.exports = seedAdditions;
