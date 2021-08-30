const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const cartRouter = require('./routes/cartRoutes');
const purchaseRouter = require('./routes/purchaseRouter');
const purchaseController = require('./controllers/purchaseController');
const AppError = require('./utils/AppError');

const app = express();

// MIDDLEWARES
const whitelist = ['http://localhost:3000', 'https://amazon-clone-jyotisko.vercel.app', 'https://amazon-clone-api.vercel.app'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(expressMongoSanitize());

app.post('/webhook-checkout', bodyParser.raw({ type: 'application/json' }), purchaseController.webhookCheckout);

app.use(express.json());

// ROUTES
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/wishlists', wishlistRouter);
app.use('/api/v1/banners', bannerRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/purchases', purchaseRouter);

// ERROR HANDLING
app.all('*', (req, _, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;


