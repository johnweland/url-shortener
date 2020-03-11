const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose       = require('mongoose');
const flash          = require('express-flash');
const session        = require('express-session');
const passport       = require('passport');

const app            = express();

require('./middleware/passport-config')(passport);

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static('assets'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.use('/', require('./routes/index'));
app.use('/shorten', require('./routes/url'));
app.use('/user', require('./routes/user'));

let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`listening on port ${PORT}`));
