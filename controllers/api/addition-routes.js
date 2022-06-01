const router = require('express').Router();
const { Addition } = require('../../models');
const withAuth = require('../../utils/auth');

// Add new Addition
router.post('/', withAuth, async (req, res) => {
console.log(req.body.additions)
  try {
    const newAddition = await Addition.create({
      ...req.body,
    });
    res.status(200).json(newAddition);
  } catch (err) {
    res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
  }
});

// Update an existing Addition
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    await Addition.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Your additional information have successfully been updated' });
  } catch (err) {
    res.status(400).json( { message: 'Your request could not be performed, please try again', body: err });
  };
});

// Delete an existing Addition
router.delete('/:id', withAuth, async ( req, res ) => {
  try {
    const additionsData = await Addition.destroy({
      where: { id: req.params.id }
    });
    if (!additionsData) {
      res.status(404).json({ message: 'The additions you are tryig to delete could not be found, please try again' });
    };
    res.status(200).json(additionsData);
  } catch (err) {
    res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
  }
}) 

module.exports = router;