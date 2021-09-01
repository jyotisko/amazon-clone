const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Purchase = require('../models/purchaseModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getCheckoutSession = catchAsync(async (req, res, _next) => {
  const items = req.body.products.map((product) => {
    return {
      name: product.name,
      description: product.description,
      images: [product.imageMain],
      amount: product.priceOffer * 100,
      currency: 'usd',
      quantity: product.quantity,
    }
  });

  const url = process.env.NODE_ENV === 'production' ? 'https://amazon-clone-jyotisko.vercel.app' : 'http://localhost:3000';
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
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
  const { line_items } = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items'] });
  const user = await User.findOne({ email: session.customer_email });
  const productIds = session.client_reference_id.split('&');

  await Promise.all(
    line_items.data.map((product, index) => {
      return Purchase.create({
        product: productIds[index],
        user: user._id,
        quantity: product.quantity,
        totalPrice: product.amount_total / 100
      });
    })
  );
};

exports.webhookCheckout = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    await processCheckoutPurchases(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.getMyPurchases = catchAsync(async (req, res, _next) => {
  const purchases = await Purchase.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      purchases: purchases
    }
  });
});