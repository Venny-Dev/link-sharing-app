const cloudinary = require("../utils/cloudinary");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Link = require("../models/linkModel");

exports.uploadPhoto = async (req, res, next) => {
  try {
    // If multer didn’t attach any file, skip straight to next()
    if (!req.file || !req.file.buffer) return next();

    const publicId = `user-${req.user._id}-${Date.now()}`;

    // Using stram upload cos i saved in memory buffer
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "devlinks_avatars",
            public_id: publicId,
            format: "jpeg", // force JPEG
            transformation: [{ width: 500, height: 500, crop: "fill" }],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    let result;
    try {
      result = await streamUpload(req.file.buffer);
    } catch (uploadErr) {
      console.error("→ uploadPhoto(): streamUpload rejected with:", uploadErr);
      return next(
        new AppError("Failed to upload image, please try again later", 500)
      );
    }

    // 3) Attach the Cloudinary URL (or public_id) to the request body
    req.body.photoUrl = result.secure_url;

    next();
  } catch (err) {
    return next(new AppError("Failed to upload image", 500));
  }
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const { firstName, lastName, photoUrl } = req.body;

  if (!firstName || !lastName) {
    return next(new AppError("Please provide Firstname and Lastname", 400));
  }

  const user = await User.findById({ _id: req.user._id });

  user.firstName = firstName;
  user.lastName = lastName;

  if (photoUrl) {
    user.image = photoUrl;
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: { user },
    message: "User updated successfully",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.user?._id || req.query.id;

  if (!id) {
    next(new AppError("User not logged in or ID was not provided"));
  }

  const curUser = await User.findById(id);
  const userLinks = await Link.find({ user: id });

  if (!curUser) {
    next(new AppError("No user found with this Id", 400));
  }

  const clientUserLinks = userLinks.map(
    ({ name: value, _id, user, __v, link }) => {
      return {
        value,
        link,
        id: _id, // Set id to the original _id value
      };
    }
  );

  const user = {
    firstName: curUser.firstName,
    lastName: curUser.lastName,
    email: curUser.email,
    image: curUser.image,
    links: clientUserLinks,
    id,
  };

  res.status(200).json({
    status: "success",
    data: user,
  });
});
