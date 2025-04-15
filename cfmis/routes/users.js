const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', authenticate, authorizeAdmin, userController.getAllUsers);
router.post('/register',  userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;


