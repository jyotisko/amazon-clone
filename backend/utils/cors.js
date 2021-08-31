const whitelist = ['http://localhost:3000', 'https://amazon-clone-jyotisko.vercel.app', 'https://amazon-clone-api.vercel.app'];
exports.corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
};

exports.corsHeadersMiddleware = (_, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
};