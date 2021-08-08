const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);
router.patch('/updateMe', userController.uploadUserPhoto, userController.processUserPhoto, userController.updateMe);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers);


module.exports = router;