const BecomeSeller = require('../models/becomeSellerModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllSellerRequests = catchAsync(async (_req, res, _next) => {
  const requests = await BecomeSeller.find();

  res.status(200).json({
    status: 'success',
    data: {
      requests: requests,
      results: requests.length
    }
  });
});

exports.getSellerRequest = catchAsync(async (req, res, _next) => {
  const request = await BecomeSeller.findOne({ _id: req.params.id });

  res.status(200).json({
    status: 'success',
    data: {
      request: request
    }
  });
});

exports.createRequest = catchAsync(async (req, res, _next) => {
  const request = await BecomeSeller.create({
    user: req.user._id || req.body.user,
    website: req.body.website,
    description: req.body.description
  });

  await User.findByIdAndUpdate(req.user._id || req.body.user, {
    isGettingVerifiedAsSeller: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      request: request
    }
  });
});

exports.deleteRequest = catchAsync(async (req, res, _next) => {
  await BecomeSeller.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(req.user._id || req.body.user, {
    isGettingVerifiedAsSeller: false
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});