const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

// Submit an app-related report (authenticated user)
router.post('/', authMiddleware, reportController.submitAppReport);

// (Optional) View all reports made by the logged-in user
router.get('/my-reports', authMiddleware, reportController.getMyReports);

// (Optional Admin) View all submitted reports
router.get('/all', authMiddleware, reportController.getAllReports);

module.exports = router;
