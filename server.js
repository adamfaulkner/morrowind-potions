var db = require('./db').sqlite_db;
var express = require('express');
var Q = require('q');
var fs = require('fs');

var app = express();

function query(ingredients) {
  var sql_ingredients = '(' + ingredients.map(function(ingredient) {
      return '?';
  }).join(',') + ')';
  var argument_ingredients = ingredients.concat(ingredients);
  return Q.ninvoke(db, 'all', 'SELECT t1.ingredient as ingredient1, t2.ingredient as ingredient2,' +
                   't1.effect ' +
                   'FROM (effects as t1, effects as t2) ' +
                   'WHERE t1.ingredient != t2.ingredient AND ' +
                   't1.effect == t2.effect AND ' +
                   'ingredient1 IN ' + sql_ingredients + ' AND ' +
                   'ingredient2 IN ' + sql_ingredients,
                   argument_ingredients
                   //{ingredients: sql_ingredients});
                   );
}

app.use('/static', express.static(__dirname + '/static'));


app.get('/ingredients', function(req, res) {
  Q.ninvoke(db, 'all', 'SELECT DISTINCT ingredient FROM effects').then(
    function(rows) {
      var result = rows.map(function(row) {
        return row.ingredient;
      });
      res.send(result);
    }, function(err) {
      res.send({'error': err});
    });
});

app.get('/api', function(req, res) {
  var ingredients = req.query.ingredients;
  if(ingredients.map === undefined) {
    res.send([]);
    return;
  }
  query(ingredients).then(function(rows) {
    res.send(rows);
  });
});

exports.query = query;

app.listen(3000);
console.log('App listening on port 3000');
