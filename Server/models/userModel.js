const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a user email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  firstName: String,
  lastName: String,
  image: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },

  emailVerificationToken: { type: String, select: false },
  emailVerificationTokenExpires: Date,
  isVerified: { type: Boolean, default: false },

  passwordResetToken: { type: String, select: false },
  passwordResetTokenExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.confirmPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  if (!this.isVerified) {
    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    this.emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;
  }

  if (this.isVerified) {
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  }

  // console.log(this);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
