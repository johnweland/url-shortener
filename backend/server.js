require('dotenv').config();
require('module-alias/register');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server online, listening on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');

});
server.use(morgan('short'));
server.use(express.urlencoded({
    extended: false
}));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
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

server.use('/api/user', require('@routes/user'));

server.use('/', (req, res) => {
    res.send('Hello World');
});