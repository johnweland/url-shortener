const User = require('@models/user');
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;
        let errors = [];
        if (!email || !password || !passwordCheck) {
            errors.push({ message: 'Not all required fields have been filled in.' });
        }
        if (password && password.length < 5) {
            errors.push({ message: 'Password must be at least 5 characters long.' });
        }
        if (password !== passwordCheck) {
            errors.push({ message: 'Passwords do not match.' });
        }
    
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            errors.push({ message: 'A user with this email already exists.' });
        }
        if (!displayName) {
            displayName = email;
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hash,
            displayName
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ errors: {message: err.message} });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let errors = [];
        if (!email || !password) {
            errors.push({ message: 'Not all required fields have been filled in.' });
        }
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(404).json({errors: {message: 'Invalid credentials'}});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(404).json({errors: {message: 'Invalid credentials'}});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                displayName: user.displayName
            }
        })
    } catch (err) {
        res.status(500).json({ errors: {message: err.message} });
    }
}

exports.get = async (req, res, next) => {
    res.send("making a get request");
}

exports.post = async (req, res, next) => {
    res.send("making a post request");
}
exports.put = (req, res, next) => {
    res.send("making a put request");
}
exports.delete = (req, res, next) => {
    res.send("making a delete request");
}
