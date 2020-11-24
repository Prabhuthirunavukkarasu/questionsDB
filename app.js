var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var catagories = require('./routes/catagories');
var topics = require('./routes/topics');
var questions = require('./routes/questions');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/catagories', catagories);
app.use('/api/topics', topics);
app.use('/api/questions', questions);

app.use(function (req, res) {
    res.sendFile(__dirname + '/public/' + 'index.html');
});
module.exports = app;
