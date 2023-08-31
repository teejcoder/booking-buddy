const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
  bandName: {
    type: String,
    required: false,
  },
  genre: {
    type: String, 
  },
  image: {
    type: String, 
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  website: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

 // SOCIALS 
  youtube: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  tiktok: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  
  // STREAMING
  spotify: {
    type: String,
    required: false,
  },
  soundcloud: {
    type: String,
    required: false,
  },
  bandcamp: {
    type: String,
    required: false,
  },
  tidal: {
    type: String,
    required: false,
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
