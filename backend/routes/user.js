
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

const userController = require('../controllers/user');

router.post('/api/auth/signup', multer, userController.signup);
router.post('/api/auth/login', rateLimiter, userController.login);
router.get('/user/profile', auth, userController.getProfile);
router.delete('/user/profile', auth, multer, userController.deleteProfile);
//router.put('/user/profile', auth, multer,  userController.updateProfile);

module.exports = router;