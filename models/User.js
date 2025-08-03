const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    department: String,
    year: Number,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Add virtual field `userId` mapped to `_id`
userSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; delete ret.password; }
});

module.exports = mongoose.model('User', userSchema);
