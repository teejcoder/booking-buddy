const express = require("express");
const router = express.Router();
const bandNameController = require("../controllers/bandName");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createBandName", bandNameController.createBandName);

module.exports = router;