const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateCommeent,
  validateUpdateCommeent,
} = require("../models/Comment");
const { User } = require("../models/User");

// Create New Comment
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCommeent(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });

  res.status(201).json(comment);
});

// Get all Comment(only)
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  return res.status(200).json(comments);
});

// Delete Comment( only admin woner of the comment)
module.exports.deleteCommentsCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404).json({ message: "comment not found" });
  }

  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "comment has been deleted" });
  } else {
    res.status(403).json({ message: " Access denied, not allowed" });
  }
});

// Update Comment (only owner of the comment)
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateCommeent(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.id !== comment.user.toString()) {
    return res.status(403).json({
      message: "access denied, only user himself can edit his comment ",
    });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedComment);
});
