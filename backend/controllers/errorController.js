module.exports = (err, req, res, next) => {
  res.status(err.statusCode || err.status || 500).json({
    message: err.message,
    error: err
  });
};