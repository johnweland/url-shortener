const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    await User.findOne({ email: req.body.email })
    .exec()
    .then(conflict => {
        if (conflict) {
            return res.status(409).json({
                error: {
                    message: `email address ${req.body.email}, already exists.` 
                }
            });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            }
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User registered"
                });
            }).catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            });
            
        });
    })
}

exports.auth = async (req, res, next) => {
    await User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (!user) {
            return res.status(401).json({
                error: {
                    message: "Auth Failed."
                }
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    error: {
                        message: "Auth Failed."
                    }
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
                    message: "Auth successful.",
                    token: token
                });
            }
            res.status(401).json({
                error: {
                    message: "Auth Failed."
                }
            });
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    })
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted."
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    })
}