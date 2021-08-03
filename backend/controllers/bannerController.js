const Banner = require('../models/bannerModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBanners = catchAsync(async (req, res, next) => {
  const banners = await Banner.find();

  res.status(200).json({
    status: 'success',
    data: {
      banners: banners
    }
  });
});
