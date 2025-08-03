// controllers/adminController.js

const User = require('../models/User');
const Ride = require('../models/Ride');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Get all rides (admin only)
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate('creator', 'name email')
      .populate('fromLocation toLocation');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rides', error: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Delete a ride by ID
exports.deleteRide = async (req, res) => {
  try {
    const rideId = req.params.id;
    const deletedRide = await Ride.findByIdAndDelete(rideId);
    if (!deletedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json({ message: 'Ride deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ride', error: err.message });
  }
};
exports.getDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const rideCount = await Ride.countDocuments();
    res.json({ userCount, rideCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
