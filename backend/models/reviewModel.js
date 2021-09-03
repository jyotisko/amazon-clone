const mongoose = require('mongoose');
const Product = require('../models/productModel');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a user!']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A review must belong to a product!']
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be above 1.0!'],
    max: [5, 'Rating must be below 5.0!'],
    required: [true, 'A review must have a rating!']
  },
  reviewTitle: {
    type: String,
    required: [true, 'A review must have a title!']
  },
  reviewDescription: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productID) {
  const stats = await this.aggregate([
    {
      $match: { product: productID }
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  await Product.findByIdAndUpdate(productID, {
    ratingsQuantity: stats.length > 0 ? stats[0].nRating : 0,
    ratingsAverage: stats.length > 0 ? stats[0].avgRating : 0
  });
};

reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  try {
    await this.r.constructor.calcAverageRatings(this.r.product);
  } catch (err) {

  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
