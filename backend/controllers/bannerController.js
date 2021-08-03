const { unlink } = require('fs/promises');
const sharp = require('sharp');
const multer = require('multer');
const { nanoid } = require('nanoid');
const Banner = require('../models/bannerModel');
const catchAsync = require('../utils/catchAsync');
const { multerFilter, multerStorage } = require('../utils/multerConfig.js');
const AppError = require('../utils/AppError');

// MULTER CONFIGURATION START
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadBannerPhoto = upload.single('image');

exports.resizeBannerPhoto = catchAsync(async (req, _res, next) => {
  if (!req.file) return next();

  req.file.filename = `banner-${nanoid(10)}.jpeg`;

  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/banners/${req.file.filename}`);

  next();
});
// MULTER CONFIGURATION END

exports.getAllBanners = catchAsync(async (_req, res, _next) => {
  const banners = await Banner.find();

  res.status(200).json({
    status: 'success',
    data: {
      banners: banners
    }
  });
});

exports.createNewBanner = catchAsync(async (req, res, _next) => {
  const banner = await Banner.create({
    ...req.body,
    image: req?.file?.filename || req.body.image
  });

  res.status(201).json({
    status: 'success',
    data: {
      banner: banner
    }
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);

  await unlink(`${__dirname}/../public/img/banners/${banner.image}`).catch((err) => {
    console.log(`ERROR 💥`, err);
    return next(new AppError('Error deleting file!', 500));
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
