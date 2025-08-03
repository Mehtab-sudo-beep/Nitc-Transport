const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware'); // optional


// Protected routes (only accessible with valid token)
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
 