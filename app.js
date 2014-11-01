'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');

var http = require('http');
var path = require('path');
var routes = require('./routes');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});

app.get('/', function (req, res) {
  var collection = db.collection('species');
  collection.find({}).toArray(function(err, species) {
    res.render('index', { species: species });
  });
});