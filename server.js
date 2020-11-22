require('dotenv').config();
const express        = require('express');
const mongoose       = require('mongoose');
const server         = express();

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
server.use(express.urlencoded({extended: false}));
server.use(express.json());

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

server.use('/', (req, res)=> {
    res.send("Hello World");
});

let PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`listening on port ${PORT}`));