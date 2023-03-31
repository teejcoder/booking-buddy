const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Create a new user
// router.post('/createUser/', upload.single('file'), userController.createUser);

// Create a new user
router.post('/createUser', upload.single('image'), userController.createUser);

// Get all users
router.get('/getAllUsers', userController.getAllUsers);

// Update a user
router.put('/update-user/:id', ensureAuth, userController.updateUser);

//handle the PUT request for updating a user
router.put('/update-user/:id', userController.updateUser);

// Delete a user
router.delete('/deleteUser/:id', ensureAuth, userController.deleteUser);


module.exports = router;