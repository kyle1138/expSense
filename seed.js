var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("sense.db");

db.run("INSERT INTO users (phone) VALUES (?), (?), (?), ( ?)",
  17187841942,
  18003828851,
  15165681333,
  19127880232,
  function(err) {
    if (err) {
      throw err;
    }
  }
);

db.run("INSERT INTO messages (phone , body , received) VALUES (?,?,?), (?,?,?), (?,?,?), (?, ?,?)",
  17187841942,'hi there', true,
  18003828851, 'nice weather we are having', true,
  15165681333, 'i would like to order a pizza', true,
  19127880232, 'When is the Party :D', true,
  function(err) {
    if (err) {
      throw err;
    }
  }
);
