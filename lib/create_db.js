var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
  if(err) throw err;

  db = database;
  
  var collection = db.collection('species');
  
  var newSpecies = require('./sample_data.json');
  
  collection.insertMany(newSpecies, function() {
    collection.find({}).toArray(function(err, species) {
      species.forEach(function(element, index, array) {
        console.log(element.name);
      });
      db.close();
    });
  });
});