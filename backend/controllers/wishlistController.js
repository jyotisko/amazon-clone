const Wishlist = require('../models/wishlistModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllWishlists = catchAsync(async (_req, res, _next) => {
  const wishlists = await Wishlist.find();

  res.status(200).json({
    status: 'success',
    data: {
      wishlists: wishlists
    }
  });
});

exports.createNewWishist = catchAsync(async (req, res, _next) => {
  const wishlist = await Wishlist.create({
    user: req.user._id || req.body.user,
    product: req.body.product
  });

  res.status(201).json({
    status: 'success',
    data: {
      wishlist: wishlist
    }
  });
});

exports.getMyWishlists = catchAsync(async (req, res, _next) => {
  const filter = { user: req.user._id };
  if (req.query.product) filter.product = req.query.product;

  const myWishlists = await Wishlist.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      wishlists: myWishlists
    }
  });
});

exports.deleteMyWishlist = catchAsync(async (req, res, _next) => {
  await Wishlist.findOneAndDelete({ product: req.params.productId, user: req.user._id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteReview = catchAsync(async (req, res, _next) => {
  await Wishlist.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});