const express = require('express');
const router = express.Router();
const {auth, notAuth} = require('../middleware/authenication-check');

const UserController = require('../contollers/user');

// @route GET /login
// @desc      GET url and redirect
router.get('/login', notAuth, UserController.renderLogin);

// @route GET /login
// @desc      GET url and redirect
router.post('/login', notAuth, UserController.login);

// @route GET /register
// @desc      GET url and redirect
router.get('/register', UserController.renderRegister);

// @route POST /register
// @desc       POST register user
router.post('/register', auth, UserController.register);

// @route GET /register
// @desc      GET register user
router.get('/logout', auth, UserController.logout);

module.exports = router;