const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const bcrypt = require("bcryptjs");
// Get all users Profile (only admin)
module.exports.getALlUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

// Get  user Profile/:id
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  res.status(200).json(user);
});

// Update User Profile (only user himself)
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  if (!req.body) {
    return res.status(400).json({
      message: "الرجاء إرسال بيانات JSON في جسم الطلب (body).",
    });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  res.status(200).json(updatedUser);
});

// Get users Count (only admin)
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

// Post Profile Photo Upload
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: " no file provided ",
    });
  }
  res.status(200).json({
    message: "Your Profile Photo Uploaded Successfully ",
  });
});

// Delete User Profile Account  (only admin or user himself)
module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  // 1. Get the user from DB
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  // 2. التحقق من الصلاحيات
  if (req.user.isAdmin || req.user.id === user._id.toString()) {
    // 3. حذف منشورات المستخدم
    await Post.deleteMany({ user: user._id });

    // 4. حذف تعليقات المستخدم
    await Comment.deleteMany({ user: user._id });

    // 5. حذف المستخدم نفسه
    await User.findByIdAndDelete(req.params.id);

    // 6. إرسال رد للعميل
    res.status(200).json({ message: "تم حذف المستخدم وجميع بياناته بنجاح" });
  } else {
    res.status(403).json({ message: "غير مصرح لك بحذف هذا المستخدم" });
  }
});
