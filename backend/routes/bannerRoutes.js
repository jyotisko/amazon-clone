const express = require('express');
const authController = require('../controllers/authController');
const bannerController = require('../controllers/bannerController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(bannerController.getAllBanners)
  .post(bannerController.uploadBannerPhoto, bannerController.resizeBannerPhoto, bannerController.createNewBanner);

router
  .route('/:id')
  .delete(bannerController.deleteBanner);

module.exports = router;
