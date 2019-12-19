const express = require('express');
const connectDB = require('./config/db');


const api = express();
// Connect to MongoDB
connectDB();

api.use(express.json({ extended: false }));

// Define Routes
api.use('/', require('./routes/index'));
api.use('/api', require('./routes/api'));

const APIPORT = 5000;
api.listen(APIPORT, () => console.log(`API service running on port: ${APIPORT}`));