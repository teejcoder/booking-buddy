const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Get a specific user
router.get('/profile/:id', ensureAuth, userController.getUserById);

// get profile
router.get('/profile', ensureAuth, userController.getProfile);

// create user
router.post('/createUser', userController.createUser);

// update user
router.get('/updateUser', userController.getUpdateUser);
router.put('/updateUser/:id', ensureAuth, userController.updateUser);

// Get all users
router.get("/feed", userController.getAllUsers);

// Delete a user
router.delete('/deleteUser/:id', ensureAuth, userController.deleteUser);

module.exports = router;