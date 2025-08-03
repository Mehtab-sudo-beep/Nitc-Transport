const mongoose=require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    ip: {type: String},
    userAgent: {type: String},
    createdAt: {type: Date,default: Date.now},
    expiresAt: {type: Date}
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Session', sessionSchema);
