const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const User = require('../models/User');
const { image } = require("../middleware/cloudinary");

module.exports = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        yearFormed: req.body.yearFormed,
        members: req.body.members,
        website: req.body.website,
        spotify: req.body.spotify,
        soundcloud: req.body.soundcloud,
        tidal: req.body.tidal,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        snapchat: req.body.snapchat,
        facebook: req.body.facebook,
      });

      res.status(201).send('User created successfully');
      res.render("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  },

  // Get user
  getUser: async (req, res) => {
    try {
      const user = await User.find().sort({  user: req.user.id }).lean();
      res.render("profile.ejs", { user: user });
    } catch (err) {
      console.log(err);
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.render('feed.ejs', { user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving users');
    }
  },

  // Get a specific user
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.render('user', { user:_id });
      res.redirect(`/profile/${req.body.id}`)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving user');
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.status(200).send('User updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    }
  }
};
