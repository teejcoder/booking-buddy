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
        appleMusic: req.body.appleMusic,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
        facebook: req.body.facebook,
      });
      console.log(data)
      res.status(201).send('User created successfully');
      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  },

  // Get user
  getUser: async (req, res) => {
    try {
      const user = await User.find(req.user.id).sort({  user: req.user.id }).lean();
      res.render("profile.ejs", { user: req.user });
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
// Get user by ID
getUserById: async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile.ejs', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user');
  }
},

// Update user
updateUser: async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Check if the user is the owner of the profile being updated
    if (user.id !== req.user.id) {
      return res.status(401).send('Unauthorized to update the profile');
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        yearFormed: req.body.yearFormed,
        members: req.body.members,
        website: req.body.website,
        spotify: req.body.spotify,
        soundcloud: req.body.soundcloud,
        appleMusic: req.body.appleMusic,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
        facebook: req.body.facebook,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
    res.render('updateUser.ejs', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
},

// handle the PUT request for updating a user
 updateUser: async (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;

  try {
    const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    res.status(200).json(result);
    res.render('updateUser.ejs', { user });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
