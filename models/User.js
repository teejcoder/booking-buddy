const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  firstName: { 
    type: String, 
    unique: true 
  },
  lastName: { 
    type: String, 
    unique: true 
  },

// replace userName with first and lastName
  userName: { 
    type: String, 
    unique: true 
  },

  email: { 
    type: String, 
    unique: true 
  },

  password: String,

  image: {
    type: String, 
    unique: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  yearFormed: {
    type: Number,
    required: true
  },
  members: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

  // SOCIALS FOR PROFILE PAGE

  website: {
    type: String,
    required: false
  },
  spotify: {
    type: String,
    required: false
  },
  soundcloud: {
    type: String,
    required: false
  },
  appleMusic: {
    type: String,
    required: false
  },
  instagram: {
    type: String,
    required: false
  },
  tiktok: {
    type: String,
    required: false
  },
  twitter: {
    type: String,
    required: false
  },
  youtube: {
    type: String,
    required: false
  },
  facebook: {
    type: String,
    required: false
  },
});









// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
