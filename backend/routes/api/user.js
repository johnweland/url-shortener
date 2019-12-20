const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('../../models/user');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json({extended: true}));

// @route POST /register
// @desc       Create an API user
router.post('/register', cors(), async (req, res, next) => {  
    await User.findOne({ email: req.body.email })
    .exec()
    .then(conflict => {
        if (conflict) {
            return res.status(409).json({
                statuscode: 'warn',
                status: 'Error: ',
                msg: `email address ${req.body.email}, already exists.`
            });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    statuscode: 'danger',
                    status: 'Internal Server Error: ',
                    msg: `${err}`
                });
            }
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user
            .save()
            .then(result => {
                res.status(201).json({
                    statuscode: 'success',
                    status: 'Success',
                    msg: `User Registered`
                });
            }).catch(err => {
                console.log(err);
                return res.status(500).json({
                    statuscode: 'danger',
                    status: 'Internal Server Error: ',
                    msg: `${err}`
                });
            });
            
        });
    })
});

// @route POST /auth
// @desc       Authenticate an API user
router.post('/auth', cors(), async (req, res, next) => {
    await User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (!user) {
            return res.status(401).json({
                statuscode: 'danger',
                status: 'Error: ',
                msg: `Authentication Failed`
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    statuscode: 'danger',
                    status: 'Error: ',
                    msg: `Authentication Failed`
                });
            }
            if (result) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    statuscode: 'success',
                    status: 'Success: ',
                    msg: `Authentication successful.`,
                    token: token
                });
            }
            res.status(401).json({
                statuscode: 'danger',
                status: 'Error: ',
                msg: `Authentication Failed`
            });
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            statuscode: 'danger',
            status: 'Internal Server Error: ',
            msg: `${err}`
        });
    })
});

// @route DELETE /:id
// @desc       Delete an API user
router.delete('/:id', cors(), async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id)
    .exec()
    .then(result => {
        res.status(200).json({
            statuscode: 'success',
            status: 'Success',
            msg: `User deleted`
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            statuscode: 'danger',
            status: 'Internal Server Error: ',
            msg: `${err}`
        });
    })
});

module.exports = router;