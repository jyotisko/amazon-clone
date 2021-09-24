const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.putUserInResponse, reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('admin', 'user'), reviewController.checkIfUserHasAlreadyReviewed, reviewController.createNewReview);

router
  .route('/:id')
  .patch(authController.protect, authController.restrictTo('admin', 'user'), reviewController.updateReview)
  .delete(authController.protect, authController.restrictTo('admin', 'user'), reviewController.deleteReview);

module.exports = router;
