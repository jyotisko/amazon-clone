const express = require('express');
const authController = require('../controllers/authController');
const becomeSellerController = require('../controllers/becomeSellerController');

const router = new express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(authController.restrictTo('admin'), becomeSellerController.getAllSellerRequests)
  .post(becomeSellerController.createRequest);

router.use(authController.restrictTo('admin'));
router
  .route('/:id')
  .get(becomeSellerController.getSellerRequest)
  .delete(becomeSellerController.deleteRequest);

module.exports = router;