const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middlewares
const authenticate = require('../middlewares/authMiddleware'); // Verifies JWT and sets req.user
const isAdmin = require('../middlewares/adminMiddleware');     // Checks if req.user.role === 'admin'

// ✅ Apply to all routes under /admin
router.use(authenticate);
router.use(isAdmin);

// Routes
router.get('/users', adminController.getAllUsers);
router.get('/rides', adminController.getAllRides);
router.delete('/user/:id', adminController.deleteUser);
router.delete('/ride/:id', adminController.deleteRide);
router.get('/dashboard', adminController.getDashboard);

module.exports = router;
