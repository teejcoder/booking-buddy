const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { ensureAuth } = require('../middleware/auth');

// Create a new user
router.post('/createUser', userController.createUser);

// Get a user
router.get('/getUserById', userController.getUserById)

// Update authenticated user's profile
router.put('/updateUser', ensureAuth, userController.updateUser);

// Delete authenticated user
router.delete('/deleteUser', ensureAuth, userController.deleteUser);

module.exports = router;
