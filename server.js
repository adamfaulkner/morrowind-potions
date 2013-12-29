var db = require('./db').sqlite_db;
var express = require('express');

var app = express();

function query(ingredients, callback) {
  db.run('SELECT t1.ingredient, t2.ingredient, t1.effect ' +
         'FROM (effects as t1, effects as t2) ' +
         'WHERE t1.ingredient != t2.ingredient AND' +
         't1.effect == t2.effect', callback);
}

app.get('/api', function(req, res) {

});

exports.query = query;
