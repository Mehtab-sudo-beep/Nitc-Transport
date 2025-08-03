const AppReport = require('../models/Report');

// POST /api/report/
// Submit a new app-related report
const submitAppReport = async (req, res) => {
  try {
    const { category, message } = req.body;

    if (!category || !message) {
      return res.status(400).json({ error: 'Category and message are required' });
    }

    const report = new AppReport({
      reportedBy: req.user.userId,
      category,
      message,
    });

    await report.save();

    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    console.error('Error submitting report:', err);
    res.status(500).json({ error: 'Server error while submitting report' });
  }
};

// GET /api/report/my-reports
// Fetch all reports submitted by the logged-in user
const getMyReports = async (req, res) => {
  try {
    const reports = await AppReport.find({ reportedBy: req.user.userId }).sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Server error while fetching your reports' });
  }
};

// GET /api/report/all
// (Admin) Get all reports from all users
const getAllReports = async (req, res) => {
  try {
    // Optional: Check if user is admin here
    // if (!req.user.isAdmin) return res.status(403).json({ error: "Access denied" });

    const reports = await AppReport.find().populate('reportedBy', 'name email').sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    console.error('Error fetching all reports:', err);
    res.status(500).json({ error: 'Server error while fetching reports' });
  }
};

module.exports = {
  submitAppReport,
  getMyReports,
  getAllReports,
};
