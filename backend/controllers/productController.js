const multer = require('multer');
const { nanoid } = require('nanoid');
const sharp = require('sharp');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const multerStorage = multer.memoryStorage();
const multerFilter = (_, file, cb) => {
  if (!file.mimetype.startsWith('image')) return cb(new AppError('Not an image! Please upload only images!'), false);
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  filter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: 'imageMain', maxCount: 1 },
  { name: 'imageAlternate', maxCount: 6 },
  { name: 'imageBanners', maxCount: 4 }
]);

exports.processImages = catchAsync(async (req, _, next) => {
  if (!req.files.imageMain) return next(new AppError('Please provide the main image!', 400));
  if (!req.files.imageAlternate && !req.files.imageBanners && !req.files.imageMain) return next();

  // Main Image
  if (req.files.imageMain) {
    const imageMainFilename = `product-main-${nanoid(10)}.jpeg`;
    await sharp(req.files.imageMain[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${imageMainFilename}`);

    req.body.imageMain = imageMainFilename;
  }

  // Alternate Images
  if (req.files.imageAlternate) {
    const altImages = [];

    await Promise.all(
      req.files.imageAlternate.map(async (file) => {
        const filenameAlt = `product-alt-${nanoid(10)}.jpeg`;

        await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filenameAlt}`);

        altImages.push(filenameAlt);
      })
    );

    req.body.imageAlternate = altImages;
  }

  // Banner Images
  if (req.files.imageBanners) {
    const banners = [];

    await Promise.all(
      req.files.imageBanners.map(async (file) => {
        const filenameBanner = `product-banner-${nanoid(10)}.jpeg`;

        await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filenameBanner}`);

        banners.push(filenameBanner);
      })
    );

    req.body.imageBanners = banners;
  }

  next();
});

exports.getAllProducts = catchAsync(async (req, res, _next) => {
  const filter = {};

  if (req.query.search) filter.keywords = { $regex: req.query.search, $options: 'i' };
  if (req.query.category) filter.categories = { $regex: req.query.category, $options: 'i' };

  const products = await Product.find(filter);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products: products
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

  const product = await Product.findOneAndUpdate(req.params.id, data, { new: true });

  res.status(201).json({
    status: 'success',
    data: {
      product: product
    }
  });
});
