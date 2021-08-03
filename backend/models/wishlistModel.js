const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A wishlist item must belong to a user!']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A wishlist item must have a product!']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product'
  });

  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;


