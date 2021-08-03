const Review = require('../models/reviewModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (_req, res, _next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: {
      reviews: reviews
    }
  });
});

exports.verifyReview = catchAsync(async (req, _res, next) => {
  const review = await Review.findOne({
    user: req.body.user || req.user._id,
    product: req.body.product
  });

  if (review) return next(new AppError('You have already reviewed this product!', 400));

  next();
});

exports.createNewReview = catchAsync(async (req, res, _next) => {
  req.body.user = req.body.user || req.user._id;
  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: review
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  if (req.body.user || req.body.product) return next(new AppError('You can only update the review title, description, and rating through this endpoint!', 400));

  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      review: review
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new AppError('Unable to find that review!', 400));
  if (String(review.user._id) !== String(req.user._id)) return next(new AppError('You can only delete your own reviews!', 400));

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
