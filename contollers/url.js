const Url = require('../models/url');

exports.create = async (req, res, next) => {
    await Url.create({ full: req.body.fullUrl});
    res.redirect('/');
}

exports.redirect = async (req, res, next) => {
    const url = await Url.findOne({short: req.params.url});
    if (url == null) return res.sendStatus(404);
    url.clicks++;
    url.save();

    res.redirect(url.full);
}

exports.delete = async (req, res, next) => {
    const url = await urlModel.findOneAndRemove({short: req.params.url});
    if (url == null) return res.sendStatus(404);
    res.redirect(204, '/');
}