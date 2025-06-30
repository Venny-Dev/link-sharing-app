const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, status, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000, // e.g. 7 days
    httpOnly: true, // Allows js-cookie to access it (but is less secure)
    secure: false, // set to true in production (HTTPS)
    path: "/", // ensures cookie is accessible on all routes
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
    message: "Login successful",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Create user
  // console.log(req.body);
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // create token and save to db
  const token = user.createVerificationToken();
  console.log(token);
  await user.save({ validateBeforeSave: false });

  // venny-devlinks.vercel.app
  // generate link and send email
  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/verify-email?token=${token}`;
  const templatePath = path.join(
    __dirname,
    "../emailTemplates/verifyEmail.html"
  );
  let emailHTML = await fs.promises.readFile(templatePath, "utf-8");
  emailHTML = emailHTML.replace(/{{VERIFICATION_LINK}}/g, verificationLink);

  const emailOptions = {
    email: user.email,
    subject: "Welcome to Venny Devlinks, Please confim your email",
    message: emailHTML,
  };

  //  Attempt to send email; if it fails, delete the new user and forward the error
  try {
    await sendEmail(emailOptions);
  } catch (err) {
    await User.findByIdAndDelete(user._id);
    return next(
      new AppError(
        "There was a problem sending your verification email. Please try signing up again.",
        500
      )
    );
  }

  user.password = undefined;
  res.status(201).json({
    status: "success",
    message:
      "Email verification link sent, please cofirm your email within 10 mins",
  });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.query.token;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  const verifiedUser = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!verifiedUser) {
    await User.findByIdAndDelete(user._id);
    return next(
      new AppError("Token is invalid or has expired, signup again", 400)
    );
  }

  verifiedUser.isVerified = true;
  verifiedUser.emailVerificationToken = undefined;
  verifiedUser.emailVerificationTokenExpires = undefined;

  await verifiedUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Email verification sucessful, You can log in to the app",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.confirmPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (!user.isVerified) {
    return next(
      new AppError("Please verify your email before logging in", 400)
    );
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in, please login", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("This user no longer exist", 401));
  }

  req.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide your email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("There is no user with this email", 404));
  }

  const token = user.createVerificationToken();
  console.log(token);
  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.get("Origin")}/reset-password/${token}`;

    const templatePath = path.join(
      __dirname,
      "../emailTemplates/resetPassword.html"
    );
    let emailHTML = await fs.promises.readFile(templatePath, "utf-8");
    emailHTML = emailHTML.replace(/{{RESET_LINK}}/g, resetUrl);

    const emailOptions = {
      email: req.body.email,
      subject: "Password Reset Email",
      message: emailHTML,
    };

    await sendEmail(emailOptions);

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an Error Sending the email. Try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.query.token;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired token", 400));
  }

  const { password, passwordConfirm } = req.body;
  if (!password || !passwordConfirm) {
    return next(new AppError("Please provide password and confirm passoword"));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  // console.log(user);
  res.status(200).json({
    status: "success",
    message: "Password reset successful, Login with your new password",
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
