const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A purchased item must have a product.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A purchased item must belong to a user.']
  },
  quantity: {
    type: Number,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'A purchased item must have a total price.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

purchaseSchema.pre(/^find/, function (next) {
  this.populate('product');
  next();
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
