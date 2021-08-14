const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'seller'),
    productController.uploadProductImages,
    productController.processImages,
    productController.createNewProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'seller'),
    productController.uploadProductImages,
    productController.processImages,
    productController.updateProduct
  );

module.exports = router;
