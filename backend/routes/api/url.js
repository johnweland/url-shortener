const express = require('express');
const router = express.Router();
const auth = require('../../middleware/check-auth');

const UrlController = require('../../contollers/url');

// @route POST /api/url/create
// @desc       Create short URL
router.post('/create', auth, UrlController.create);

// @route GET /api/url/:id
// @desc       Delete a short URL
router.delete('/:id', UrlController.delete);

// @route GET /api/url/list
// @desc       List short URLs
router.get('/list', UrlController.list);

module.exports = router;