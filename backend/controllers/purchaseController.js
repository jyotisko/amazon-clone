const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Purchase = require('../models/purchaseModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const items = req.body.products.map((product) => {
    return {
      name: product.name,
      description: product.description,
      images: [product.imageMain],
      amount: product.priceOffer * 100,
      currency: 'usd',
      quantity: product.quantity
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: (req.body.products.map((product) => product.productId)).join('&'),
    success_url: 'http://127.0.0.1:3000',
    cancel_url: 'http://127.0.0.1:3000',
  });

  res.status(200).json({
    status: 'success',
    session: session
  });
});
