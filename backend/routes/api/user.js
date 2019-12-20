const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = require('../../contollers/user');

// @route POST /register
// @desc       Create an API user
router.post('/register', UserController.register);

// @route POST /auth
// @desc       Authenticate an API user
router.post('/auth', UserController.auth);

// @route DELETE /:id
// @desc       Delete an API user
router.delete('/:id', UserController.delete);

module.exports = router;