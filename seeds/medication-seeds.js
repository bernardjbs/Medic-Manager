const { Medication } = require('../models');

const medicationData = [
  {
    medication_name: 'Panadol',
    price: 14.99,
    user_id: 1,
  },
  {
    medication_name: 'Neurofen',
    price: 90.0,
    user_id: 5,
  },
  {
    medication_name: 'Zantac',
    price: 22.99,
    user_id: 4,
  },
  {
    medication_name: 'Claritin',
    price: 12.99,
    user_id: 3,
  },
  {
    medication_name: 'Vitamin C',
    price: 29.99,
    user_id: 2,
  },
];

const seedMedications = () => Medication.bulkCreate(medicationData);

module.exports = seedMedications;
