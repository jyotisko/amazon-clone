const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
  });
};

const setCookie = (req, res, token) => {
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true
  });
};

exports.signup = catchAsync(async (req, res, _next) => {
  const user = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    streetAddress: req.body.streetAddress || '',
    country: req.body.country || ''
  });

  const token = createToken(user);
  setCookie(req, res, token);

  req.user = user;
  res.status(201).json({
    status: 'success',
    token: token
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Please provide email and password!', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError('Incorrect email or password', 401));

  const token = createToken(user);
  setCookie(req, res, token);

  req.user = user;
  res.status(200).json({
    status: 'success',
    token: token
  });
});

exports.logout = catchAsync(async (_req, res, _next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, _res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

const notLoggedInResponse = (res) => {
  res.status(200).json({
    status: 'success',
    data: null
  });
};

exports.isLoggedIn = async (req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return notLoggedInResponse(res);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return notLoggedInResponse(res);

    if (currentUser.changedPasswordAfter(decoded.iat)) return notLoggedInResponse(res);

    req.user = currentUser;

    if (currentUser) {
      res.status(200).json({
        status: 'success',
        data: {
          user: currentUser
        }
      });
    }
  } catch (err) {
    notLoggedInResponse(res);
  }
};