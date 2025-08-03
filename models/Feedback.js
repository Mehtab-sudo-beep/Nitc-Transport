const mongoose=require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.module('Feedback', feedbackSchema);