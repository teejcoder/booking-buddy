const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const User = require('../models/User');

module.exports = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      await User.create({
        userName: req.body.userName,
        firstName: req.bodyfirstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        website: req.body.website,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        genre: req.body.genre,
        spotify: req.body.spotify,
        soundcloud: req.body.soundcloud,
        ageRange: req.body.ageRange,
        ethnicity: req.body.ethnicity,
        gender: req.body.gender,
        height: req.body.height,
        hair: req.body.hair,
        eyes: req.body.eyes,
      });
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
    getProfile: async (req, res) => {
    try {
      const user = await User.find({ user: req.user });
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

// GET Update user
getUpdateUser: async (req, res) => {
  try {
  
    res.render("updateUser.ejs", { user: req.user });
  } catch (err) {
    console.log(err);
  }
},

// Update user
updateUser: async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { user: req.user.id },
      {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: res.secure_url, 
        cloudinaryId: res.public_id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        website: req.body.website,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        genre: req.body.genre,
        spotify: req.body.spotify,
        soundcloud: req.body.soundcloud,
        ageRange: req.body.ageRange,
        ethnicity: req.body.ethnicity,
        gender: req.body.gender,
        height: req.body.height,
        hair: req.body.hair,
        eyes: req.body.eyes,
        updatedAt: Date.now()
      },
      { new: true }
    );

    // Pass the user object to the view
    res.render("profile.ejs", { user: updateUser });

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
