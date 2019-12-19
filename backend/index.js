const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const api = express();
// Connect to MongoDB
connectDB();

api.use(express.json({ extended: false }));
api.use(cors());
// Define Routes
api.use('/', require('./routes/index'));
api.use('/api', require('./routes/api'));
api.use('/user', require('./routes/user'));

const _PORT = 5000;
api.set('port', process.env.PORT || _PORT);
api.listen(api.get('port'), () => console.log(`API service running on port: ${_PORT}`));