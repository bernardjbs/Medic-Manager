const router = require('express').Router();
const nodemailer = require('../../utils/nodemailer');
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
      req.session.user_id = dbUserData.id
      res.status(200).json(dbUsersData);
    });

    console.log('SEND WELCOME MAIL HERE') 
    const subject = 'Welcome to Medic Manager'
    const content = `
          <h1>Welcome to Medic Manager</h1>
    
          <p>Dear ${req.body.firstName} ${req.body.lastName}, </P>
          <p>thank you for signing up with Medic Manager. With us, you will be able to manage your medications with no hassle.</p>
          <p>Please do not hesitate to contact our support team, should there be any inqiry: </p>
          <p>Tel: (08)5555-8989 - email: <a href="mailto:node.medic.manager@gmail.com">node.medic.manager@gmail.com</a></p>
          <p>Kind Ragards, </p>
          <p>Medic Manager Team </p>
          `
    nodemailer.sendMail(req.body.email, subject, content)
    
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