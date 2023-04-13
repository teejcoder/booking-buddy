const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  // user credentials
  firstName: { 
    type: String, 
    unique: true,
  },
  lastName: { 
    type: String, 
    unique: true, 
  },
  userName: {
    type: String, 
    unique: true, 
  },
  email: { 
    type: String, 
    unique: true, 
  },

  password: String,

  image: {
    type: String, 
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  title: {
    type: String,
    required: false,
  },

 // SCHEMA FOR ALL USERS
 
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },


  // MUSIC SCHEMA
  genre: {
    type: String,
    required: false,
  },
  spotify: {
    type: String,
    required: false,
  },
  soundcloud: {
    type: String,
    required: false,
  },


  // ACTOR/MODEL/COMEDIAN/MUSICIAN SCHEMA
  ageRange: {
    type: String,
    required: false,
  },
  ethnicity: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female',  'non-binary'],
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  hair: {
    type: String,
    required: false,
  },
  eyes: {
    type: String,
    required: false,
  }

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
