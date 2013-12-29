var db = require('./db.js').sqlite_db;
var fs = require('fs');

// Ingredients table
exports.install = function() {
  db.run('CREATE TABLE effects (' +
         'ingredient, effect, ' +
         ' PRIMARY KEY (ingredient, effect) )',
         function(err) {
           if(err) {
             console.error(err);
           } else {
             console.log('Done');
           }
         });
};

function insert(name, effects) {
  var finshed = 0;
  function done(err) {
    if (err) {
      throw err;
    }
  }

  effects.forEach(function(effect) {
    db.run('INSERT INTO effects VALUES (?, ?)',
           name, effect, done);
  });
}

exports.load = function() {
  console.log(__dirname + '/ingredients.csv');
  fs.readFile(
    __dirname + '/ingredients.csv',
    {encoding: "ascii"},
    function(err, file_data) {
      if (err) {
        throw err;
      }
      var rows = file_data.split('\n');
      rows.forEach(function(row_string) {
        var row = row_string.split(',');
        var name = row[0];
        var effects = row.slice(3);
        if (name && effects) {
          insert(name, effects);
        }
      });
    });
};
