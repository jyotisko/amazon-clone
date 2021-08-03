const multer = require('multer');
const AppError = require('./AppError');

exports.multerFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

exports.multerStorage = multer.memoryStorage();