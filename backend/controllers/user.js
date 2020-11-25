const User = require('@models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;
        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ message: "Not all required fields have been entered." });
        }
        if (password && password.length < 5) {
            return res.status(400).json({ message: "The password needs to be at least 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ message: "Password and Password Confirmation do not match."});
        }
    
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists."});
        }
        if (!displayName) {
            displayName = email;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hash,
            displayName
        });
        await newUser.save();
        res.status(201).json({
            email,
            displayName
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Not all required fields have been filled in.' });
        }
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(401).json({message: 'Invalid credentials.'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid credentials.'});
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
        res.status(500).json({message: err.message});
    }
}

exports.validate = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(400).json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.status(404).json(false);

        return res.status(200).json(true);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.get = async (req, res) => {
    try {
    const user = await User.findById(req.user);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({
            id :user._id,
            displayName: user.displayName,
            email: user.email
        });
    }  catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.post = async (req, res) => {
    res.send("making a post request");
}
exports.put = (req, res) => {
    res.send("making a put request");
}
exports.delete = (req, res) => {
    res.send("making a delete request");
}
