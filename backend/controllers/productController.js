const multer = require('multer');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');
const { multerFilter, multerStorage } = require('../utils/multerConfig.js');
const uploadImageToCloudinary = require('../utils/cloudinaryUploader');

const upload = multer({
  storage: multerStorage,
  filter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: 'imageMain', maxCount: 1 },
  { name: 'imageAlternates', maxCount: 6 },
  { name: 'imageBanners', maxCount: 4 }
]);

exports.processImages = catchAsync(async (req, _, next) => {
  if (req.files && !req?.files?.imageMain) return next(new AppError('Please provide the main image!', 400));
  if (!req?.files?.imageAlternates && !req?.files?.imageBanners && !req?.files?.imageMain) return next();

  const folder = '/amazon/products/';

  // Main Image
  if (req?.files?.imageMain) {
    const imageMainBuffer = await sharp(req.files.imageMain[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    const imageMainName = await uploadImageToCloudinary(imageMainBuffer, folder, `main-${nanoid(10)}`);
    req.body.imageMain = imageMainName;
  }

  // Alternate Images
  if (req?.files?.imageAlternates) {
    const altImages = [];
    await Promise.all(
      req.files.imageAlternates.map(async (file) => {
        const altBuffer = await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();

        const altImageName = await uploadImageToCloudinary(altBuffer, folder, `alt-${nanoid(10)}`);
        altImages.push(altImageName);
      })
    );

    req.body.imageAlternates = altImages;
  }

  // Banner Images
  if (req?.files?.imageBanners) {
    const bannerImages = [];
    await Promise.all(
      req.files.imageBanners.map(async (file) => {
        const bannerBuffer = await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();

        const bannerImageName = await uploadImageToCloudinary(bannerBuffer, folder, `banner-${nanoid(10)}`);
        bannerImages.push(bannerImageName);
      })
    );

    req.body.imageBanners = bannerImages;
  }

  next();
});

exports.getAllProducts = catchAsync(async (req, res, _next) => {
  const filter = {};
  const limit = 10;

  if (req.query.search) filter.keywords = { $regex: req.query.search, $options: 'i' };
  if (req.query.category) filter.categories = { $regex: req.query.category, $options: 'i' };

  const { query } = new APIFeatures(Product.find(filter), req.query).paginate(limit);
  const products = await query;

  const totalPages = Math.ceil((await Product.find(filter)).length / limit);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products: products,
      totalPages: totalPages
    }
  });
});

exports.getProduct = catchAsync(async (req, res, _next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      product: product
    }
  });
});

exports.createNewProduct = catchAsync(async (req, res, _next) => {
  req.body.sellerUser = req.body.sellerUser || req.user._id;
  const product = await Product.create({
    ...req.body,
    technicalDetails: JSON.parse(req.body.technicalDetails),
    additionalInfo: JSON.parse(req.body.additionalInfo)
  });

  res.status(201).json({
    status: 'success',
    data: {
      product: product
    }
  });
});

exports.updateProduct = catchAsync(async (req, res, _next) => {
  let data = req.body;

  if (data.technicalDetails) data.technicalDetails = JSON.parse(data.technicalDetails);
  if (data.additionalInfo) data.additionalInfo = JSON.parse(additionalInfo);

  const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

  res.status(201).json({
    status: 'success',
    data: {
      product: product
    }
  });
});
