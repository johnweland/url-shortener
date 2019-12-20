const Url = require('../models/url');

exports.default = async (req, res) => {
    try {
        let url = await Url.findOne({ urlCode: req.params.code });
        if (!url) {
            return res.status(404).json('No URL found');
        }
        let newClicks = url.get("clicks");
        newClicks ++;
        Url.updateOne({ 
            urlCode: req.params.code
        },
        {
            $set: {
                clicks: newClicks
            }
        },
        {
            upsert: false 
        })
        .catch((err) => {
            if (err) return res.status(500).send({error: err});
        });
        return res.redirect(url.longURL);
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
}