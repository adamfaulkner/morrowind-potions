var sqlite3 = require('sqlite3');

exports.sqlite_db = new sqlite3.Database('ingredients.sqlite');
