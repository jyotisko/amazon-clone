const express = require('express');
const authController = require('../controllers/authController');
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

router.use(authController.protect);
router.post('/checkout-session', purchaseController.getCheckoutSession);
router.get('/myPurchases', purchaseController.getMyPurchases);

module.exports = router;