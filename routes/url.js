const express = require('express');
const router = express.Router();

const UrlController = require('../contollers/url');

// @route POST /
// @desc       Create an shortened URL
router.post('/', UrlController.create);

// @route DELETE /:id
// @desc         Delete an API user
router.delete('/:url', UrlController.delete);

module.exports = router;