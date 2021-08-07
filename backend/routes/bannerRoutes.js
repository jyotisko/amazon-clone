const express = require('express');
const authController = require('../controllers/authController');
const bannerController = require('../controllers/bannerController');

const router = express.Router();

router
  .route('/')
  .get(bannerController.getAllBanners)
  .post(authController.protect, authController.restrictTo('admin'), bannerController.uploadBannerPhoto, bannerController.resizeBannerPhoto, bannerController.createNewBanner);

router
  .route('/:id')
  .delete(authController.protect, authController.restrictTo('admin'), bannerController.deleteBanner);

module.exports = router;
