const Ride = require('../models/Ride');
const Location = require('../models/Location');
const User = require('../models/User');

// Create a new ride with dynamic location creation
exports.createRide = async (req, res) => {
  try {
    const {
      fromLocationName,
      toLocationName,
      date,
      time,
      vehicleType,
      totalSeats,
      price,
      notes
    } = req.body;

    const creator = req.User.userId;

    // Check or create fromLocation
    let fromLocation = await Location.findOne({ name: fromLocationName });
    if (!fromLocation) {
      fromLocation = await Location.create({ name: fromLocationName });
    }

    // Check or create toLocation
    let toLocation = await Location.findOne({ name: toLocationName });
    if (!toLocation) {
      toLocation = await Location.create({ name: toLocationName });
    }

    const ride = new Ride({
      creator,
      fromLocation: fromLocation._id,
      toLocation: toLocation._id,
      date,
      time,
      vehicleType,
      totalSeats,
      availableSeats: totalSeats,
      price,
      notes
    });

    await ride.save();
    res.status(201).json({ message: 'Ride created successfully', ride });

  } catch (err) {
    res.status(500).json({ message: 'Error creating ride', error: err.message });
  }
};

// Get all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate('creator', 'name email')
      .populate('fromLocation')
      .populate('toLocation')
      .populate('passengers', 'name email');
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rides', error: err.message });
  }
};

// Get ride by ID
exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('fromLocation')
      .populate('toLocation')
      .populate('passengers', 'name email');

    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ride', error: err.message });
  }
};

// Update ride
// exports.updateRide = async (req, res) => {
//   try {
//     const rideId = req.params.id;
//     const updateData = req.body;

//     // If locations are being updated by name, handle them
//     if (updateData.fromLocationName) {
//       let fromLocation = await Location.findOne({ name: updateData.fromLocationName });
//       if (!fromLocation) {
//         fromLocation = await Location.create({ name: updateData.fromLocationName });
//       }
//       updateData.fromLocation = fromLocation._id;
//     }

//     if (updateData.toLocationName) {
//       let toLocation = await Location.findOne({ name: updateData.toLocationName });
//       if (!toLocation) {
//         toLocation = await Location.create({ name: updateData.toLocationName });
//       }
//       updateData.toLocation = toLocation._id;
//     }

//     const updatedRide = await Ride.findByIdAndUpdate(rideId, updateData, { new: true });

//     if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });

//     res.status(200).json({ message: 'Ride updated successfully', updatedRide });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating ride', error: err.message });
//   }
// };

// Delete ride
exports.deleteRide = async (req, res) => {
  try {
    const rideId = req.params.id;
    const deletedRide = await Ride.findByIdAndDelete(rideId);
    if (!deletedRide) return res.status(404).json({ message: 'Ride not found' });

    res.status(200).json({ message: 'Ride deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ride', error: err.message });
  }
};

// Join a ride (as passenger)
exports.joinRide = async (req, res) => {
  try {
    const rideId = req.params.id;
    const UserId = req.User.userId;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.availableSeats <= 0) {
      return res.status(400).json({ message: 'No available seats' });
    }

    if (ride.passengers.includes(UserId)) {
      return res.status(400).json({ message: 'Already joined this ride' });
    }

    ride.passengers.push(UserId);
    ride.availableSeats -= 1;

    // Automatically set status to full if no more seats
    if (ride.availableSeats === 0) {
      ride.status = 'full';
    }

    await ride.save();
    res.status(200).json({ message: 'Successfully joined the ride', ride });

  } catch (err) {
    res.status(500).json({ message: 'Error joining ride', error: err.message });
  }
};
