exports.index = function(db) {
    return function (req, res) {
        var collection = res.locals.db.collection('species');
        collection.find({}).toArray(function(err, species) {
          res.render('index', { species: species });
        });
    };
};