const express = require('express');
const router = express.Router();


const Url = require('../models/user');

// @route POST /signup
// @desc       Create an API user
router.post('/signup', async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

// @route POST /login
// @desc       Authenticate an API user
router.post('/login', async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

// @route DELETE /:userID
// @desc       Delete an API user
router.delete('/:userID', async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;