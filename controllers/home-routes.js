const router = require('express').Router();

// Import models (tables) to extract info from and import info to
const { Addition, Medication, User } = require('../models');

// Authenticate that user is logged in before allowing access to certain parts of webpage with this middleware
const withAuth = require('../utils/auth')

// CRUD operations
router.get('/', (req, res) => {
    res.render('homepage')
})

router.post('/', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            let username = req.session.username;
            res.status(200).json(username);
        } else {
            res.status(200).json({ message: "Not logged in" });
        }

    } catch (err) {
        console.log(err);
    }
})

// Creating a route to get data from additions
router.get('/dashboard', withAuth, async (req, res) => {

    const userMedsData = await Medication.findAll({
        where: {
            // 1 for testing, change to req.session.user_id
            user_id: 1,
        },
        order: [['med_exp_date', 'DESC']],
    })
    const userMeds = userMedsData.map((meds) => meds.get({ plain: true }))

    res.status(200).render('dashboard', { userMeds, loggedIn: req.session.loggedIn })
})

// hitting login page returns to home page or login depending on signin status
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/medication/:id', withAuth, async (req, res) => {
    try {
        const medicationData = await Medication.findByPk(req.params.id, { include: { model: Addition } })
        const medication = medicationData.get({ plain: true });
        console.log(medication);
        res.status(200).render('medication', { 
            ...medication,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/medication', (req, res) => {
    if (req.session.loggedIn) {
        res.render('medication', {
            user_id: req.session.id, 
            loggedIn: req.session.loggedIn
        })
    } else {
        res.render('homepage');
    }
})

module.exports = router;