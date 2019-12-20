const express = require('express');
const router = express.Router();
const Controller = require("../contollers/index");

// @route GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', Controller.default);

module.exports = router;