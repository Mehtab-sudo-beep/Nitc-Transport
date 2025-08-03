const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fromLocation: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    toLocation: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: String,
    vehicleType: { 
        type: String,
        enum: ['Auto', 'Cab', 'Train']
    },
    totalSeats: Number,
    availableSeats: Number,
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    price: Number,
    notes: String,
    status: {
        type: String,
        enum: ['full', 'open', 'closed'],
        default: 'open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);

