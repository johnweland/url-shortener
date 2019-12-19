const express = require('express');
const router = express.Router();
var cors = require('cors');
const validURL = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

// @route POST /api/create
// @desc       Create short URL
router.post('/create', async (req, res) => {
    try {
        const { longURL } = req.body;
        let { urlCode } = req.body;
        const baseURL = config.get('baseURL');

        if (!validURL.isUri(baseURL)) {
            return res.status(400).json('Invalid baseURL');
        }
        if (!validURL.isUri(longURL)) {
            return res.status(400).json('Invalid URL');
        }
        
        let codeCheck = await Url.findOne({urlCode});
        if (codeCheck) {
            return res.status(409).json(`custom CODE: "${urlCode}", already exists.`);
        }

        if (!urlCode || urlCode == 'undefined') {
            urlCode = shortid.generate();
        }
        do {
            try {
              var duplicateCode = await Url.findOne({ urlCode });
        
              if (duplicateCode) {
                urlCode = shortid.generate();
              }
            } catch (error) {
              console.error(err);
              return res.status(500).json('Server error');
            }
        } while (duplicateCode);
        

        let url = await Url.findOne({longURL});
        if (url) {
            res.json(url);
        } else {
            const shortURL = baseURL + '/' + urlCode;
            url = new Url({
                longURL,
                shortURL,
                urlCode,
                date: Date.now()
            });

            await url.save();
            res.json(url);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(`Server Error: ${err}`);
    }
});

// @route GET /api/delete
// @desc       Delete a short URL
router.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        let list = await Url.findByIdAndDelete(id, (err, data)=> {
            if (err) {
                throw error;
            }
            return res.status(204).json('Deletetion successful');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// @route GET /api/list
// @desc       List short URLs
router.get('/list', cors(), async (req, res) => {
    try {
        let list = await Url.find();
        res.json({'data': list});
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;