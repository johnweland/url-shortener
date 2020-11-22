exports.auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/user/login');
    }
    return next();
}

exports.notAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}