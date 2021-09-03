const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/myWishlists', wishlistController.getMyWishlists);
router.delete('/myWishlists/:id', wishlistController.deleteMyWishlist)

router
  .route('/')
  .get(authController.restrictTo('admin'), wishlistController.getAllWishlists)
  .post(wishlistController.createNewWishist);

router
  .route('/:id')
  .delete(authController.restrictTo('admin'), wishlistController.deleteMyWishlist);

module.exports = router;
