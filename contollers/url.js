const validURL = require('valid-url');
const shortid = require('shortid');
const mongoose = require('mongoose');
const baseURL = process.env.BASE_URL
const Url = require('../models/url');

exports.create = async (req, res, next) => {
    try {
        let { longURL } = req.body;
        let { urlCode } = req.body;
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
                _id: new mongoose.Types.ObjectId(),
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
            status: 'Internal Server Error: ',
            msg: `${err}`
        });
    }
}

exports.delete = async (req, res, next) => {   
    const { id } = req.params;
    await Url.findByIdAndDelete(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "URL deleted."
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.list = async (req, res, next) => {
    await Url.find()
    .exec()
    .then((list) => {
        res.json({'data': list});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });
}