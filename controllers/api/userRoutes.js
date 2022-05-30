const router = require('express').Router();

// Import any Models that are intended to be used on this page
const { User } = require('../../models');

// End point POST operation to create a new user, using the User model (table)
router.post('/', async (req, res) => {
  try {

    const dbUsersData = await User.create({
      user_email: req.body.email,
      user_first_name: req.body.firstName,
      user_last_name: req.body.lastName,
      password: req.body.password
    });

    const dbUserData = await User.findOne({
      where: {
        user_email: req.body.email,
      },
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.user_first_name;
      req.session.id = dbUserData.id

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
    const dbUserData = await User.findOne({
      where: {
        user_email: req.body.email,
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
      req.session.username = dbUserData.user_first_name;
      req.session.user_id = dbUserData.id

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