const LocalStratagy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (passport) => {
    passport.use(
        new LocalStratagy({usernameField: 'email'}, (email, password, done) => {
            User.findOne({email: email})
            .then(async user => {
                if(!user) {
                    return done(null, false, {message: 'Login failed'});
                }
                await bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) throw error;
                    if (!isMatch) {
                        return done(null, false, {message: 'Login failed'});
                    }
                    
                    return done(null, user);
                    
                    
                });
            })
            .catch(error => console.error(error));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
}