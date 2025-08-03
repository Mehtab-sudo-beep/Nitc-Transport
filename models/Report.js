const mongoose = require('mongoose');

const appReportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['bug', 'suggestion', 'complaint', 'other'], required: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);