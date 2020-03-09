const express = require('express');
const mongoose = require('mongoose');
const urlModel = require('./models/urls');

const app = express();

mongoose.connect(
    process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.get('/', async (req, res, next) => {
    const urls = await urlModel.find();
    res.render('index', {urls: urls});
});

app.post('/shorten', async (req, res, next) => {
    await urlModel.create({ full: req.body.fullUrl});
    res.redirect('/');
});

app.get('/:url', async (req, res, next) => {
    const url = await urlModel.findOne({short: req.params.url});
    if (url == null) return res.sendStatus(404);
    url.clicks++;
    url.save();

    res.redirect(url.full);
});

app.listen(process.env.PORT || 5000);
