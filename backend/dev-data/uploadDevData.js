require('dotenv').config({ path: '../config.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

const URI = process.env.DB_URI.replace('%USERNAME%', process.env.DB_USERNAME).replace('%PASSWORD%', process.env.DB_PASSWORD);

(async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });

  console.log('DB connection successful');

  await Product.create(products).catch(err => console.log(err));

  console.log('Data uploaded');

  process.exit(1);
})();
