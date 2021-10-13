const mongoose = require('mongoose');
const validator = require('validator');

const becomeSellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'In order to become a seller, one must have an user id!']
  },
  website: {
    type: String,
    required: [true, 'A seller must have an official website!'],
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: 'Please provide a valid website URL!'
    }
  },
  description: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >= 200;
      },
      message: 'Description must at least contain 200 characters.'
    },
    required: [true, 'A seller must describe their business, in at least 200 letters.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

becomeSellerSchema.pre(/^findOne/, function (next) {
  this.populate('user');
  next();
});

const BecomeSeller = mongoose.model('BecomeSeller', becomeSellerSchema);

module.exports = BecomeSeller;
