const express = require('express');
const { register, login, logout, profile, survey, getOneUser , goals, deleteGoal} = require('../controllers/userController');

const checkToken = require('../middlewares/checkToken');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);
//Logout route
router.post('/logout', logout);

// Profile route
router.get('/profile', profile);

router.put('/survey', survey);

router.put('/goals', goals)

//router.get('/me', checkToken, getOneUser);
router.delete('/goals/:id', deleteGoal)


module.exports = router;