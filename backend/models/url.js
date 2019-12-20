const mongoose = require('mongoose');

const urlScheme = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    urlCode: String,
    longURL: String,
    shortURL: String,
    date: {type: String, default: new Date},
    clicks: Number
});

module.exports = mongoose.model('Url', urlScheme);