const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('admin', 'user'), reviewController.verifyReview, reviewController.createNewReview);

router
  .route('/:id')
  .patch(authController.protect, authController.restrictTo('admin', 'user'), reviewController.updateReview)
  .delete(authController.protect, authController.restrictTo('admin', 'user'), reviewController.deleteReview);

module.exports = router;
