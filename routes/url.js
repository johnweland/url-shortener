const express = require('express');
const router = express.Router();

const UrlController = require('../contollers/url');
const {auth} = require('../middleware/authenication-check');

// @route POST /
// @desc       Create an shortened URL
router.post('/', auth, UrlController.create);

// @route DELETE /:id
// @desc         Delete an URL
router.delete('/:url', auth, UrlController.delete);

module.exports = router;