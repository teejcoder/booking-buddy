const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Create a new user
router.post('/createUser', upload.single('image'), userController.createUser);

// Get all users
router.get('/getAllUsers', userController.getAllUsers);

// Delete a user
router.delete('/deleteUser/:id', ensureAuth, userController.deleteUser);


module.exports = router;