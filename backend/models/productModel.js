const mongoose = require('mongoose');
const validator = require('validator');
const { customAlphabet } = require('nanoid');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!']
  },
  priceOriginal: {
    type: Number,
    required: [true, 'A product must have a price!']
  },
  priceOffer: {
    type: Number,
    required: [true, 'A product must have a offer price!'],
    validate: {
      validator: function (value) {
        return value < this.priceOriginal;
      },
      message: 'The offer price must be lower than the original price!'
    }
  },
  imageMain: {
    type: String,
    required: [true, 'A product must have have the main image!']
  },
  imageAlternate: {
    type: [String],
  },
  imageBanners: {
    type: [String]
  },
  description: {
    type: String,
    required: [true, 'A product must have a description!'],
    minlength: 10
  },
  productBrand: {
    type: String,
    required: [true, 'A product must have a brand!']
  },
  productAbout: {
    type: [String]
  },
  isInStock: {
    type: Boolean,
    default: true
  },
  sellerUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A product must have a seller!']
  },
  sellerLink: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: 'Please provide a valid seller link!'
    }
  },
  technicalDetails: {
    type: Object,
    required: [true, 'A product must have some technical specifications!']
  },
  additionalInfo: {
    type: Object,
    required: [true, 'A product must have some additional info!']
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  ASIN: {
    type: String,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)
  },
  keywords: {
    type: String,
  },
  categories: {
    type: [String],
    enum: ['mobiles', 'electronics', 'books', 'toys']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.virtual('savingsPrice').get(function () {
  return this.priceOriginal - this.priceOffer;
});

productSchema.virtual('savingsPercentage').get(function () {
  const savings = this.priceOriginal - this.priceOffer;
  const percentage = (savings / this.priceOriginal) * 100;
  return percentage;
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'sellerUser',
    select: 'name phone'
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
