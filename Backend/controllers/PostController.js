const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
const { Comment } = require("../models/Comment");

// Create New Post
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: req.file ? `/images/${req.file.filename}` : "",
      publicId: null,
    },
  });

  if (!post) {
    return res.status(400).json({ message: "Post not created" });
  }

  res.status(201).json(post);
});

// Get all post
module.exports.getAllPostCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let posts;

  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

// Get Single Post/:id
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["-password"])
    .populate("comments");
  if (!post) {
    return res.status(404).json({ message: " post not found" });
  }
  res.status(200).json(post);
});

// Get Post Count
module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});

// Delete Post (only admin or owner of the post)
module.exports.DeletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    // DC
    await Comment.deleteMany({
      PostId: post._id,
    });

    res.status(200).json({
      message: "Post has been deleted successfully",
      PostId: post._id,
    });
  } else {
    res.status(403).json({
      message: "access denied, forbidden",
    });
  }
});

// Update  Post/:id (only owner of the post )
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // 1. validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //2. get the post from db and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: " Post not found " });
  }

  //3. check if this post belong to login in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: " access denied, you are not allowed " });
  }

  //4. Update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  //5. send response to the client
  res.status(200).json(updatedPost);
});

//Put Toggle Link/:id
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  console.log(post, "info post");
  console.log(loggedInUser, "id user giving like");

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }

  res.status(200).json(post);
});
