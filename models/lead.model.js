const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    username: String,
    phone: String,
    email: String,
    ip: String,
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    userAgent: String,
    device: String,
    leadNumber: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lead', LeadSchema);
