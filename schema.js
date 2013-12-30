var db = require('./db.js').sqlite_db;
var fs = require('fs');
var Q = require('q');

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

  var done_promises = effects.map(function(effect) {
    var clean_name = name.trim();
    var clean_effect = effect.trim();
    console.log('inserting', clean_name, clean_effect);
    return Q.ninvoke(db, "run", 'INSERT INTO effects VALUES (?, ?)', clean_name, clean_effect).then(function() {
      console.log('DONE inserting');
    });
  });

  return Q.all(done_promises);
}

exports.load = function() {
  fs.readFile(
    __dirname + '/ingredients.csv',
    {encoding: "ascii"},
    function(err, file_data) {
      if (err) {
        throw err;
      }
      var rows = file_data.split('\n');
      var done_promises = rows.map(function(row_string) {
        var row = row_string.split(',');
        var name = row[0];
        var effects = row.slice(3);
        if (name && effects) {
          return insert(name, effects);
        }
      });
      Q.all(done_promises).then(function() {
        console.log('Finished!');
      });
    });
};
