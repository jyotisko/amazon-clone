const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.get('/myWishlists', wishlistController.getMyWishlists);
router
  .route('/')
  .get(authController.restrictTo('admin'), wishlistController.getAllWishlists)
  .post(wishlistController.createNewWishist);

router
  .route('/:productId')
  .delete(wishlistController.deleteWishlist);

module.exports = router;
