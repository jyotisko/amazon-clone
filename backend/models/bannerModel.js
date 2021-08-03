const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'A banner must have a image!']
  },
  link: {
    type: String,
    required: [true, 'A banner must have a redirection link!']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
