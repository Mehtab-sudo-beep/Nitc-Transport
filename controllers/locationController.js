const Location = require("../models/Location");

// Create a new pickup or drop location
exports.createLocation = async (req, res) => {
  try {
    const { name, type, coordinates } = req.body;

    if (!name || !type || !coordinates) {
      return res.status(400).json({ message: 'Missing name, type, or coordinates' });
    }

    if (!['pickup', 'drop'].includes(type)) {
      return res.status(400).json({ message: 'Invalid location type. Use "pickup" or "drop".' });
    }

    const location = new Location({ name, type, coordinates });
    await location.save();

    res.status(201).json({ message: 'Location created successfully', location });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create location', error: err.message });
  }
};

// Get all locations or filter by type (pickup/drop)
exports.getAllLocations = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const locations = await Location.find(filter);
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching locations', error: err.message });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching location', error: err.message });
  }
};

// Update pickup or drop location (by any user)
exports.updateLocation = async (req, res) => {
  try {
    const { name, type, coordinates } = req.body;

    const updated = await Location.findByIdAndUpdate(
      req.params.id,
      { name, type, coordinates },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Location not found' });

    res.status(200).json({ message: 'Location updated successfully', location: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating location', error: err.message });
  }
};

// Delete location (still allowed by anyone in this version)
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.remove();
    res.status(200).json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting location', error: err.message });
  }
};

// Get nearby locations using geospatial coordinates
exports.getNearbyLocations = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'Missing lat/lng' });

    const locations = await Location.find({
      coordinates: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            radius / 6378137
          ]
        }
      }
    });

    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Error finding nearby locations', error: err.message });
  }
};

// Optional: Get only pickup or drop locations
exports.getPickupLocations = async (req, res) => {
  try {
    const pickups = await Location.find({ type: 'pickup' });
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get pickup locations' });
  }
};

exports.getDropLocations = async (req, res) => {
  try {
    const drops = await Location.find({ type: 'drop' });
    res.status(200).json(drops);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get drop locations' });
  }
};
