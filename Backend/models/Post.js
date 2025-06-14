const mongoose = require("mongoose");
const joi = require("joi");

//Post Schema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// populate Comments For Post
PostSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

//Post Model
const Post = mongoose.model("Post", PostSchema);

// validate Create Post
function validateCreatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200).required(),
    description: joi.string().trim().min(6).required(),
    category: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// validate Update Post
function validateUpdatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200),
    description: joi.string().trim().min(6),
    category: joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
