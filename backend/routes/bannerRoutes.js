const express = require('express');
const authController = require('../controllers/authController');
const bannerController = require('../controllers/bannerController');

const router = express.Router();

router
  .route('/')
  .get(bannerController.getAllBanners)
  .post(authController.protect, authController.restrictTo('admin'), bannerController.uploadBannerPhoto, bannerController.processPhoto, bannerController.createNewBanner);

router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/:id')
  .patch(bannerController.uploadBannerPhoto, bannerController.processPhoto, bannerController.updateBanner)
  .delete(bannerController.deleteBanner);

module.exports = router;
