const sharp = require('sharp');
const multer = require('multer');
const { nanoid } = require('nanoid');
const Banner = require('../models/bannerModel');
const catchAsync = require('../utils/catchAsync');
const { multerFilter, multerStorage } = require('../utils/multerConfig.js');
const uploadImageToCloudinary = require('../utils/cloudinaryUploader');

// MULTER CONFIGURATION START
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadBannerPhoto = upload.single('image');

exports.processPhoto = catchAsync(async (req, _res, next) => {
  if (!req.file) return next();

  const bannerBuffer = await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  const filename = await uploadImageToCloudinary(bannerBuffer, '/amazon/banners/', `banner-${nanoid(4)}`);
  req.file.filename = filename;
  req.body.image = filename;

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

exports.updateBanner = catchAsync(async (req, res, next) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(201).json({
    status: 'success',
    data: {
      banner: banner
    }
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  await Banner.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
