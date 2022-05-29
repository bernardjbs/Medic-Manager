const { Medication } = require('../models');

const medicationData = [
  {
    med_name: 'Panadol',
    med_price: 14.99,
    med_type: 'Pain Killer', 
    med_date_acquired: new Date('22 May 2022'),
    med_script_renewed: new Date('15 April 2022'), 
    med_exp_date: new Date('06 October 2021'),
    user_id: 1,
  },
  {
    med_name: 'Nurofen',
    med_price: 90.0,
    med_type: 'Pain Killer', 
    med_date_acquired: new Date('21 June 2022'),
    med_script_renewed: new Date('15 July 2021'), 
    med_exp_date: new Date('26 November 2025'),
    user_id: 5,
  },
  {
    med_name: 'Zantac',
    med_price: 22.99,
    med_type: 'Stomach Relief', 
    med_date_acquired: new Date('22 May 2022'),
    med_script_renewed: new Date('15 April 2022'), 
    med_exp_date: new Date('06 October 2025'),
    user_id: 4,
  },
  {
    med_name: 'Claratyne',
    med_price: 12.99,
    med_type: 'Alergic Relief', 
    med_date_acquired: new Date('22 December 2021'),
    med_script_renewed: new Date('15 April 2021'), 
    med_exp_date: new Date('25 September 2023'),
    user_id: 3,
  },
  {
    med_name: 'Vitamin C',
    med_price: 29.99,
    med_type: 'Daily Vitamin', 
    med_date_acquired: new Date('22 May 2022'),
    med_exp_date: new Date('08 March 2025'),
    user_id: 2,
  },
];

const seedMedications = () => Medication.bulkCreate(medicationData);

module.exports = seedMedications;

//used common BRAND names of over the counter medications (as opposed to generic names)
