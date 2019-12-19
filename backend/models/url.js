const mongoose = require('mongoose');

const urlScheme = new mongoose.Schema({
    urlCode: String,
    longURL: String,
    shortURL: String,
    date: {type: String, default: Date.now}
});

module.exports = mongoose.model('url', urlScheme);