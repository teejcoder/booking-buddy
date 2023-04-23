const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const userController = require('../controllers/user');
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);

// Get a specific user
router.get('/profile/:id', userController.getUserById);

router.post('/createUser', userController.createUser);

router.get('/updateUser/:id', userController.getUpdateUser);
router.put('/updateUser/:id', ensureAuth, userController.updateUser);


// Get all users
router.get("/feed", userController.getAllUsers);

// Delete a user
router.delete('/deleteUser/:id', ensureAuth, userController.deleteUser);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
