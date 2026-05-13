const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.get('/all', userController.getAllUsers);
router.get('/all/:id', userController.getUserById);
router.put('/all/:id', userController.updateUserById);
router.delete('/all/:id', userController.deleteUserById);


// // ✅ CORRECT: Static routes must come first
// app.get('/users/all usersController.getAllUsers);

// // Dynamic route handles 24-character IDs below
// app.get('/users/:id', usersController.getUserById);


module.exports = router;