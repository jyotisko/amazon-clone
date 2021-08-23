const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A cart must have a product!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A cart must belong to a user!']
  },
  quantity: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  }).populate({
    path: 'product',
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;