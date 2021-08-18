const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCartItems = catchAsync(async (_req, res, _next) => {
  const cartItems = await Cart.find();

  res.status(200).json({
    status: 'success',
    data: {
      cartItems: cartItems
    }
  });
});

exports.getMyCartItems = catchAsync(async (req, res, next) => {
  const filter = { user: req.user._id };
  if (req.query.product) filter.product = req.query.product;

  const myCartItems = await Cart.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      cartItems: myCartItems
    }
  });
});

exports.createCartItem = catchAsync(async (req, res, _next) => {
  const cartItem = await Cart.create({
    product: req.body.product,
    user: req.user._id,
    quantity: req.body.quantity || 1
  });

  res.status(201).json({
    status: 'success',
    data: {
      cartItem: cartItem
    }
  });
});

exports.deleteCartItem = catchAsync(async (req, res, _next) => {
  await Cart.deleteOne({
    product: req.params.product,
    user: req.user._id
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});