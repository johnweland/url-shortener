const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    process.env.MONGO_URI, 
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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

app.listen(process.env.PORT || 5000);
