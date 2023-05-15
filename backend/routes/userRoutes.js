const express = require('express');
const { register, login, profile } = require('../controllers/userController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route
router.get('/profile', profile);

module.exports = router;