const express = require('express');
const router = express.Router();
const {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  getNearbyLocations,
} = require('../controllers/locationController');

// Create a new location (pickup or drop)
router.post('/', createLocation);

// Get all locations (optional filter by type=pickup/drop)
router.get('/', getAllLocations);

// Get a location by ID
router.get('/:id', getLocationById);

// Update a location (name/type/coordinates)
router.put('/:id', updateLocation);

// Delete a location
router.delete('/:id', deleteLocation);

// Get nearby locations using coordinates (lat, lng, radius)
router.get('/nearby/search', getNearbyLocations);

module.exports = router;
