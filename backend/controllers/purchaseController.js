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

  const url = process.env.NODE_ENV === 'production' ? 'https://amazon-clone-jyotisko.vercel.app' : 'http://localhost:3000';
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: (req.body.products.map((product) => product.productId)).join('&'),
    success_url: url,
    cancel_url: url,
  });

  res.status(200).json({
    status: 'success',
    session: session
  });
});

const processCheckoutPurchases = async (session) => {
  console.log('Webhook checkout!')
  console.log(session);
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    processCheckoutPurchases(event.data.object);
  }

  res.status(200).json({ received: true });
};