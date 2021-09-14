const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const getReviewStats = async (productId) => {
  const decideSum = (rating) => {
    return {
      '$sum': {
        '$cond': [{ '$eq': ['$rating', rating] }, 1, 0]
      },
    };
  };

  const [stats] = await Review.aggregate([
    {
      $match: {
        product: mongoose.Types.ObjectId(productId)
      }
    },
    {
      $group: {
        _id: null,
        ratingsWith5Star: decideSum(5),
        ratingsWith4Star: decideSum(4),
        ratingsWith3Star: decideSum(3),
        ratingsWith2Star: decideSum(2),
        ratingsWith1Star: decideSum(1),
        totalRatings: { $sum: 1 }
      }
    }
  ]);

  return stats;
};

exports.getAllReviews = catchAsync(async (req, res, _next) => {
  const filter = {};
  let stats = null;

  if (req.params.productId) {
    filter.product = req.params.productId;
    stats = await getReviewStats(req.params.productId);
  }

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      reviews: reviews,
      stats: stats
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
