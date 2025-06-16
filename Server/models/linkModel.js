const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a platform name"],
  },
  link: {
    type: String,
    unique: true,
    required: [true, "Please provide a link"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A Link must have a user id"],
    select: false,
  },
});

linkSchema.index({ user: 1, name: 1 });
linkSchema.index({ user: 1, link: 1 });

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
