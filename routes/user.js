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

// Get a specific user
router.get('/getUserById', userController.getUserById);

// Get logged in user
router.get('/getUser/:id', ensureAuth, userController.getUser);

// Update a user
router.put('/updateUser/:id', ensureAuth, userController.updateUser);

// Delete a user
router.delete('/deleteUser/:id', ensureAuth, userController.deleteUser);


module.exports = router;
