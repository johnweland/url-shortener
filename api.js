const express = require('express');
const port = process.env.PORT || 5000;
const mongouri = process.env.MONGO_URI || null;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = express();


// Connect to MongoDB
mongoose.connect(
    mongouri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(morgan('dev'));

api.use((req, res, next) => {
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

// Define Routes
api.use('/', require('./routes/index'));
api.use('/api/url', require('./routes/api/url'));
api.use('/api/user', require('./routes/api/user'));

api.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

api.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
});

api.listen(56111, () => {
    console.log(`API Server running on port ${port}`);
});