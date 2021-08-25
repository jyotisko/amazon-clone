const express = require('express');
const authController = require('../controllers/authController');
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

router.post('/checkout-session', authController.protect, purchaseController.getCheckoutSession);

module.exports = router;