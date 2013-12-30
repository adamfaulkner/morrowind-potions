var db = require('./db').sqlite_db;
var express = require('express');
var Q = require('q');

var app = express();

function query(ingredients) {
  var sql_ingredients = '(' + ingredients.map(function(ingredient) {
      return '?';
  }).join(',') + ')';
  console.log(sql_ingredients);
  var argument_ingredients = ingredients.concat(ingredients);
  console.log(argument_ingredients);
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

app.get('/api', function(req, res) {

});

exports.query = query;
