const mongoose = require("mongoose");
const joi = require("joi");

// Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

// validate Create Comment
function validateCreateCommeent(obj) {
  const schema = joi.object({
    postId: joi.string().required().label("post Id"),
    text: joi.string().trim().required().label("text "),
  });
  return schema.validate(obj);
}

// validate Update Comment
function validateUpdateCommeent(obj) {
  const schema = joi.object({
    text: joi.string().trim().required().label("text"),
  });
  return schema.validate(obj);
}

module.exports = {
  Comment,
  validateCreateCommeent,
  validateUpdateCommeent,
};
