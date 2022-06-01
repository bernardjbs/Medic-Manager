const router = require('express').Router();

// Using the auth function to authenticate current user is logged in. If not, redirect to login page
// *** NOTE: Remove withAuth to test with insomnia ***
const withAuth = require('../../utils/auth');

// Importing model Medication
const { Medication, Addition } = require('../../models');

router.get('/additions', async (req, res) => {

  const userMedsData = await Medication.findAll({
      where: { 
        user_id: req.session.user_id,
      },
      include: [{
        model: Addition
      }],
      order: [['med_exp_date', 'DESC']],
  })
  const userMeds = userMedsData.map((meds) => meds.get({plain: true}))

  res.status(200).json({ userMeds, loggedIn: req.session.loggedIn })
})

// Creating route to create a new medication
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.session.user_id)
    const newMedication = await Medication.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newMedication);
  } catch (err) {
    res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
  };
});

// Creating a route to delete an existing medication
router.delete('/:id', withAuth, async ( req, res ) => {

  try {
    
    const additionsData = await Addition.destroy({
      where: {
        medication_id: req.params.id
      }
    })

    const medicationData = await Medication.destroy({
      where: {
        id: req.params.id, 
        // user_id: req.session.user_id
      }
    });
    
    if (!additionsData) {
      res.status(404).json({ message: 'The additions you are tryig to delete could not be found, please try again' });
    };
    if (!medicationData) {
      res.status(404).json({ message: 'The medication you are tryig to delete could not be found, please try again' });
    };

    res.status(200).json(medicationData)
  } catch (err) {
    res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
  };
});

// Creating a route to update an existing medication 
router.put('/:id', withAuth, async ( req, res ) => {
  try {
    await Medication.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Your medication details have successfully been updated' });
  } catch (err) {
    res.status(400).json( { message: 'Your request could not be performed, please try again', body: err });
  };
});

module.exports = router;