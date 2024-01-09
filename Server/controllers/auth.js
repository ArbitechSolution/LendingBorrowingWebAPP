const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Web3 = require("web3");
// Instantiate a web3 instance with your RPC URL
const web3 = new Web3(process.env.RPC_URL);
const { TokenAddress, TokenAbi } = require("../utils/Contract");
const contract = new web3.eth.Contract(TokenAbi, TokenAddress);

// @description       Register user
// @route             POST  api/v1/auth/register
// @access            Public
exports.register = asyncHandler(async (req, res, next) => {
  // create user
  const { name, email, password, wallet } = req.body;

  // validate body data
  const user = new User({
    name,
    email,
    password,
    wallet,
  });

  await user.validate();

  // if user is created then transefeer 10 AFT tokens to user wallet
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.log("Please set your private key as an environment variable.");
    return;
  }

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const tokenCostInEther = 10;

  // Convert ether to wei
  const tokenCostInWei = web3.utils.toWei(tokenCostInEther.toString(), "ether");

  // Create transaction
  const txData = await contract.methods
    .transfer(wallet, tokenCostInWei.toString())
    .encodeABI();

  const gas = await contract.methods
    .transfer(wallet, tokenCostInWei.toString())
    .estimateGas({ from: account.address });

  const txParams = {
    from: account.address,
    to: TokenAddress,
    data: txData,
    gas,
  };

  // Sign transaction
  const signedTx = await web3.eth.accounts.signTransaction(
    txParams,
    account.privateKey,
  );

  // // Send transaction
  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  if (!txHash.transactionHash) {
    return next(new ErrorResponse("User not created", 404));
  }

  // save user
  await user.save();

  // send token response
  sendTokenResponse(user, 201, res);
});

// @description       Login user
// @route             POST  api/v1/auth/login
// @access            Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // send token response
  sendTokenResponse(user, 200, res);
});

// @description       Update user details
// @route             PUT  api/v1/auth/updatedetails
// @access            Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // get user from database
  const fieldsToUpdate = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
  };

  // update user
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  // send response
  res.status(200).json({ success: true, data: user });
});

// @description       Update password
// @route             PUT  api/v1/auth/updatepassword
// @access            Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  // get user from database
  const user = await User.findById(req.user.id).select("+password");

  // check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  // update password
  user.password = req.body.newPassword;
  await user.save();

  // send token response
  sendTokenResponse(user, 200, res);
});

// @description       Get current logged in user
// @route             POST  api/v1/auth/me
// @access            Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // get user from database
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  // send response
  res.status(200).json({
    success: true,
    data: user,
  });
});

// description       Forget password
// route             POST  api/v1/auth/forgetpassword
// access            Public
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // get user from database
  const user = await User.findOne({ email: req.body.email });

  // check if user exists
  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();
  // save user
  await user.save({ validateBeforeSave: false });

  // URl for the resetPassword route of my client side
  const resetUrl = `${process.env.CLIENT_URI}/resetPassword/${resetToken}`;
  const message = `Click ${resetUrl} this link to reset your password.\nThis link will expire in 10 minutes.`;

  // send email
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @description       Reset password
// @route             PUT  api/v1/auth/resetpassword/:resettoken
// @access            Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  console.log(req.params.resettoken);
  // get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  // get user from database
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // check if user exists
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // save user
  await user.save();

  // send token response
  sendTokenResponse(user, 200, res);
});

// @description       Log user out / clear cookie
// @route             GET  api/v1/auth/logout
// @access            Private
exports.logout = asyncHandler(async (req, res, next) => {
  // set cookie to none
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true,
  });

  // send response
  res.status(200).json({ success: true, data: {} });
});

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  // set cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ), // convert to milliseconds
    httpOnly: true, // cookie cannot be accessed by the browser
  };

  // set secure flag to true if in production mode
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // send response
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
