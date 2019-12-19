const express = require('express');
const router = express.Router();
const cors = require('cors');
const validURL = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const bodyParser = require('body-parser');

const Url = require('../models/url');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json({extended: true}));

// @route POST /api/create
// @desc       Create short URL
router.post('/create', cors(), async (req, res, next) => {
    try {
        let { longURL } = req.body;
        let { urlCode } = req.body;
        const baseURL = config.get('baseURL');
        if (!validURL.isUri(baseURL)) {
            return res.status(400).json({
                statuscode: 'danger',
                status: 'Error',
                msg: 'Invalid Base URL'
            });
        }
        if (!validURL.isUri(longURL)) {
            return res.status(400).json({
                statuscode: 'danger',
                status: 'Error',
                msg: 'Invalid URL'
            });
        }
        
        let codeCheck = await Url.findOne({urlCode});
        if (codeCheck) {
            return res.status(409).json({
                statuscode: 'danger',
                status: 'Error',
                msg: `custom CODE: "${urlCode}", already exists.`
            });
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
              return res.status(500).json({
                statuscode: 'danger',
                status: 'Error',
                msg: 'Internal Server Error'
              });
            }
        } while (duplicateCode);
        

        let url = await Url.findOne({longURL});
        if (url) {
            res.json(url);
        } else {
            let shortURL = baseURL + '/' + urlCode;
            shortURL.trim();
            url = new Url({
                longURL,
                shortURL,
                urlCode,
                date: new Date,
                clicks: 0
            });

            await url.save();
            res.json({
                statuscode: 'success',
                status: 'Success',
                msg: `URL Created`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            statuscode: 'danger',
            status: 'Error',
            msg: `Internal Server Error: ${err}`
        });
    }
});

// @route GET /api/delete
// @desc       Delete a short URL
router.post('/delete', cors(), async (req, res, next) => {   
    const { id } = req.body;
    try {
        await Url.findByIdAndDelete(id, (err)=> {
            if (err) {
                throw error;
            }
            return res.status(200).json({
                statuscode: 'success',
                status: 'Success',
                msg: `URL Deleted`
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            statuscode: 'danger',
            status: 'Error',
            msg: `Internal Server Error: ${err}`
        });
    }
});

// @route GET /api/list
// @desc       List short URLs
router.get('/list', cors(), async (req, res, next) => {
    try {
        let list = await Url.find();
        res.json({'data': list});
    } catch (err) {
        console.error(err);
        res.status(500).json({
            statuscode: 'danger',
            status: 'Error',
            msg: `Internal Server Error: ${err}`
        });
    }
});

module.exports = router;