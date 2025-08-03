const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional if using authentication

// Create feedback (POST)
router.post('/', authMiddleware, feedbackController.submitFeedback);

// Get all feedbacks for a specific ride
router.get('/ride/:rideId', feedbackController.getFeedbacksForRide);