const Url = require('../models/url');

exports.default = async (req, res, next) => {
    const urls = await Url.find({created_user: req.user.id});
    res.render('index', {
        host: req.protocol + '://' + req.get('host') + '/',
        urls: urls,
        name: req.user.name
    });
}