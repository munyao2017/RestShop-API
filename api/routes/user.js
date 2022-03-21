const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/user');


router.post('/signup', usercontroller.user_signup);

 route.post('/login', usercontroller.user_login);

 route.delete('/:userId', usercontroller.user_delete);

module.exports = router;