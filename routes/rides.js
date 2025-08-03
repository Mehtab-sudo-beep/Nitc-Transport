const express = require('express');
const router = express.Router();

const rideController = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require the user to be authenticated
router.post('/', authMiddleware, rideController.createRide);
router.get('/', rideController.getAllRides);
router.get('/:id', rideController.getRideById);
// router.put('/:id', authMiddleware, rideController.updateRide);
router.delete('/:id', authMiddleware, rideController.deleteRide);
router.post('/:id/join', authMiddleware, rideController.joinRide);

module.exports = router;
