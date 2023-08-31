const cloudinary = require("../middleware/cloudinary");
const Band = require('../models/Band');

module.exports = {
  // Create a new band
  createBand: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      
      const newBand = await Band.create({
        bandName: req.body.bandName,
        genre: req.body.genre,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        website: req.body.website,
        description: req.body.description,
        location: req.body.location,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        spotify: req.body.spotify,
        soundcloud: req.body.soundcloud,
        bandcamp: req.body.bandcamp,
        tidal: req.body.tidal,
      });

      res.status(201).json(newBand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating band' });
    }
  },

  // Get authenticated band
  getAuthenticatedBand: async (req, res) => {
    try {
      res.json(req.band);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error fetching band' });
    }
  },

  // Get all bands
  getAllBands: async (req, res) => {
    try {
      const bands = await Band.find();
      res.json(bands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving bands' });
    }
  },

  // Get band by ID
  getBandById: async (req, res) => {
    try {
      const band = await Band.findById(req.params.id);
      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }
      res.json(band);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving band' });
    }
  },

  // Update band
  updateBand: async (req, res) => {
    try {
      const updateBand = await Band.findOneAndUpdate(
        { _id: req.band.id },
        {
            bandName: req.body.bandName,
            genre: req.body.genre,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            website: req.body.website,
            description: req.body.description,
            location: req.body.location,
            youtube: req.body.youtube,
            instagram: req.body.instagram,
            tiktok: req.body.tiktok,
            twitter: req.body.twitter,
            facebook: req.body.facebook,
            spotify: req.body.spotify,
            soundcloud: req.body.soundcloud,
            bandcamp: req.body.bandcamp,
            tidal: req.body.tidal,
        },
        { new: true }
      );

      res.json(updateBand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating band' });
    }
  },

  // Delete a band
  deleteBand: async (req, res) => {
    try {
      const band = await Band.findByIdAndDelete(req.params.id);
      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }
      res.status(200).json({ message: 'Band deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting band' });
    }
  }
};
