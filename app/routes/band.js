const express = require('express');
const router = express.Router();
const bandController = require('../controllers/band');
const { ensureAuth } = require("../middleware/auth");

// Create a new band
router.post('/createBand', bandController.createBand);

// Get authenticated band
router.get('/profile', ensureAuth, bandController.getAuthenticatedBand);

// Get all bands
router.get("/feed", bandController.getAllBands);

// Get a specific band by ID
router.get('/bands/:id', bandController.getBandById);

// Update a band
router.put('/updateBand/:id', ensureAuth, bandController.updateBand);

// Delete a band
router.delete('/deleteBand/:id', ensureAuth, bandController.deleteBand);

module.exports = router;
