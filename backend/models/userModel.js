const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!']
  },
  phone: {
    type: Number,
    // required: [true, 'A user must have a phone!'],
    validate: {
      validator: function (value) {
        return String(value).length === 10;
      },
      message: 'Phone number must have a length of 10!'
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user must have a email!'],
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Please enter a valid email!'
    }
  },
  password: {
    type: String,
    required: [true, 'A user must have a password!'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a password confirm!'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'The password and confirm passwords do not match!'
    }
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/jyocloud/image/upload/v1628359625/amazon/users/default_qxecvn.jpg'
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'seller', 'user']
  },
  streetAddress: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (!this.passwordChangedAt) return false;
  const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  return JWTTimestamp < changedTimestamp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
