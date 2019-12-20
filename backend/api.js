const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


const api = express();
// Connect to MongoDB
connectDB();

api.use(express.json({ extended: false }));
api.use(cors());
api.use(morgan('dev'));

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

module.exports = api;