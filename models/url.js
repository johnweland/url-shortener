const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    Date: {
        type: Date,
        default: Date.now
    },
    created_user: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('urls', urlSchema);
