const whitelist = [
  'http://localhost:3000/',
  'http://localhost:5000/',
  'http://127.0.0.1:3000/',
  'http://127.0.0.1:5000/',
  'https://amazon-clone-jyotisko.vercel.app/',
  'https://amazon-clone-api.vercel.app/'
];

exports.corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    return callback(null, true);
  }
};

exports.corsHeadersMiddleware = (_, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
};