var sqlite3 = require('sqlite3');
sqlite3.verbose();

exports.sqlite_db = new sqlite3.Database('ingredients.sqlite');
