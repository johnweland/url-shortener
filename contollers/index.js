const Url = require('../models/url');

exports.default = async (req, res, next) => {
    const urls = await Url.find();
    res.render('index', {host: req.protocol + '://' + req.get('host') + '/', urls: urls});
}