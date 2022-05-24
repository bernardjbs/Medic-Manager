const router = require('express').Router();

// Import any Models that are intended to be used on this page
const { Users } = require('../../models');

// End point POST operation to create a new user, using the User model (table)
router.post('/', async (req, res) => {
  try {

    const dbUsersData = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username

      res.status(200).json(dbUsersData);
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  
// POST request from user to attempt to login to website once account is created.
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  
// Logout request from user attempting to logout of website. Destroyes connection to current session.
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;