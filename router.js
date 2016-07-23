var express = require('express')

var youtube_mp3 = require('./youtube_mp3')

var router = express.Router();
var static_url = process.env.NODE_MUSIC_STATIC_URL

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'meow!' });
});

router.route('/dl/youtube').get(function(req, res) {
    url = req.param('url');
    title = req.param('title');
    youtube_mp3.download(url, title, function(filename) {
        console.log('Downloading completed: ' + filename);
        mp3_url = static_url + encodeURI(filename);
        res.redirect(mp3_url);
    });
});

exports.router = router
