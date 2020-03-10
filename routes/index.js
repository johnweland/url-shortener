const express = require('express');
const router = express.Router();

const DefaultController = require('../contollers/index');
const UrlController = require('../contollers/url');


// @route GET /
// @desc      GET urls and render UI
router.get('/', DefaultController.default);

// @route GET /:url
// @desc      GET url and redirect
router.get('/:url', UrlController.redirect);

module.exports = router;