const express = require('express');
const router = express.Router();


const Url = require('../models/url');

// @route GET /:code
// @desc      Redirect to long/original URL

router.get('/:code', async (req, res) => {
    try {
        let url = await Url.findOne({ urlCode: req.params.code });
        if (!url) {
            return res.status(404).json('No URL found');
        }
        return res.redirect(url.longURL);
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;