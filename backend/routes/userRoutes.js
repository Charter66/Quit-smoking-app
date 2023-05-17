const express = require('express');
const { register, login, profile, survey, getOneUser } = require('../controllers/userController');

const checkToken = require('../middlewares/checkToken');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route
router.get('/profile', profile);

router.put('/survey', survey);

router.get('/me', checkToken);

module.exports = router;