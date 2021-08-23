const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = new express.Router();

router.use(authController.protect);

router.get('/myCarts', cartController.getMyCartItems);
router
  .route('/myCarts/:productId')
  .patch(cartController.updateMyCartItem)
  .delete(cartController.deleteMyCartItem);

router
  .route('/')
  .get(authController.restrictTo('admin'), cartController.getAllCartItems)
  .post(cartController.createCartItem);

// router
//   .route('/:productId')
//   .delete(cartController.deleteCartItem);

module.exports = router;