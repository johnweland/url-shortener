const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.renderLogin = (req, res, next) => {
    res.render('login');
}

exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
});
exports.renderRegister = (req, res, next) => {
    res.render('register');
}

exports.register = (req, res, next) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({message: 'Please fill in all fields'});
    }
    if (password !== password2) {
        errors.push({message: 'Passwords do not match'});
    }
    if (password.length < 6) {
        errors.push({message: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        return res.render('register', { errors, name, email, password, password2 });
    }

    User.findOne({email: email})
    .then(user => {
        if(user) {
            errors.push({message: 'Email is already registered'});
            return res.render('register', { errors, name, email, password, password2 });
        }

        const newUser = new User({
            name,
            email,
            password
        });
        bcrypt.hash(newUser.password, 10, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save()
            .then(user => {
                req.flash('success_message', 'You are now registered');
                res.redirect('/user/login');
            })
            .catch(error => console.error(error));
        });
    });
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/user/login');
}