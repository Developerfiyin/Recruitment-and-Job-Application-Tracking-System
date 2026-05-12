const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerValidator, authController.register);

router.post('/login', loginValidator, authController.login);

router.get('/me', protect, authController.getMe);

module.exports = router;