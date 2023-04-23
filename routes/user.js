const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// Update a user


module.exports = router;