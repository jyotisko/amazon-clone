const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { multerFilter, multerStorage } = require('../utils/multerConfig.js');
const uploadImageToCloudinary = require('../utils/cloudinaryUploader');

// IMAGE CONFIGURATION START //
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.processUserPhoto = catchAsync(async (req, _res, next) => {
  if (!req.file) return next();

  const processedBuffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  req.processedBuffer = processedBuffer;
  next();
});
// IMAGE CONFIGURATION END //

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (_req, res, _next) => {
  const users = await User.find();
  res.status(200).json({
    data: {
      users: users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));

  const filteredBody = filterObj(req.body, 'name', 'email', 'streetAddress', 'country', 'phone', 'city', 'country', 'state', 'zipcode');

  if (req.processedBuffer) {
    const filename = await uploadImageToCloudinary(req.processedBuffer, '/amazon/users/', `user-${req.user._id}-${Date.now()}`);
    filteredBody.photo = filename;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});
