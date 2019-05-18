var express = require('express');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var fs = require('fs');
var Datastore = require('nedb'),
    db = new Datastore({
        filename: './data/db.json',
        autoload: true
    });
var app = express();

var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('lib'));

app.get('/everyone', function (req, res) {
    fs.readFile('everyone.hbs', 'utf8', (err, data) => {
        db.find({}, {}, (err, docs) => {
            res.contentType('application/json');
            res.status(200).send(docs);
        });
    });
});

app.get('/male', function (req, res) {
    fs.readFile('everyone.hbs', 'utf8', (err, data) => {
        db.find({
            gender: 'male'
        }, {}, (err, docs) => {
            res.contentType('application/json');
            res.status(200).send(docs);
        });
    });
});

app.get('/female', function (req, res) {
    fs.readFile('everyone.hbs', 'utf8', (err, data) => {
        db.find({
            gender: 'female'
        }, {}, (err, docs) => {
            res.contentType('application/json');
            res.status(200).send(docs);
        });
    });
});

app.get('/under30', function (req, res) {
    fs.readFile('everyone.hbs', 'utf8', (err, data) => {
        db.find({
            age: {
                $lt: 30
            }
        }, {}, (err, docs) => {
            res.contentType('application/json');
            res.status(200).send(docs);
        });
    });
});

app.get('/over30', function (req, res) {
    fs.readFile('everyone.hbs', 'utf8', (err, data) => {
        db.find({
            age: {
                $gte: 30
            }
        }, {}, (err, docs) => {
            res.contentType('application/json');
            res.status(200).send(docs);
        });
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
