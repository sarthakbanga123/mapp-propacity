const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const authController = require('../controllers/authController');
const middleware = require('../middleware/middleware')

router.post('/login', authController.login);
router.post('/signup', authController.signUp);


module.exports = router;
