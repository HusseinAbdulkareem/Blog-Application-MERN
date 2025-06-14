const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

// Register
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // validate
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // is User already exists
  let user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (user) {
    return res.status(400).json({
      message: "user already exist",
    });
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // new user and save it to Db
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();
  // @TODO --- sending email (verify account  )

  // send a res to clicent
  res.status(201).json({
    message: "you registered successfully, please log in ",
  });
});

// login
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // 1. validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // 2. is user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email " });
  }
  // 3. check the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid  password" });
  }

  // @TODO --- sending email (verify account if not verified)

  // 4. generate token (jwt)
  const token = user.generateAuthToken();
  // 5.  response to client
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    username: user.username,
    token,
  });
});
