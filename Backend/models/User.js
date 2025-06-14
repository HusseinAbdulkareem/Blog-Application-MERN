const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },

    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 8,
    },

    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png",
        pubilcId: null,
      },
    },

    bio: {
      type: String,
      trim: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Populate Posts That Bleongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

//generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
};

// user module
const User = mongoose.model("User", UserSchema);

// validation Register User
function validateRegisterUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
// validation Login User
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// validation Update User
function validateUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100),
    password: joi.string().trim().min(8),
    bio: joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
