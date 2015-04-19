var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var fs = require('fs');
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("sense.db");
var app = express();
var msgArr = [];
var reqB;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  db.get("SELECT * FROM users", function(err, uRow) {
    uRow.forEach(function(user){
      db.get("SELECT * FROM messages WHERE phone = ?", user.phone, function(err, mRow){
        if(err){ throw err;}
        uRow[user][messages] = mRow;
      })
    })




  // var string = "";
  // msgArr.forEach(function(msg){
  //   string += '<br>' + msg;
  // })
  response.json(uRow);
});
});



app.post('/sms', twilio.webhook({
    validate:false
}), function(request, response) {

  var rPhone = request['body']['From'];
  var rBody = request['body']['Body'];



  db.get("SELECT * FROM users WHERE phone = ?", rPhone, function(err, row) {
    if(row){
      db.run("INSERT INTO messages (message,phone) VALUES(?,?)" , rBody, rPhone, function(err){});
    }else{
    db.run("INSERT INTO users (phone) VALUES (?)", rPhone, function(err) {
    if(err) { throw err; }
    // var id = this.lastID; //weird way of getting id of what you just inserted
    db.run("INSERT INTO messages (message,phone) VALUES(?,?)" , rBody, rPhone, function(err) {
      if(err) { throw err; }

    });
  });
}


});

    msgArr.push(request['body']['Body']);
    console.log(request['body']);
    // Create a TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.message('Hello from express node.js!');

    // Render the TwiML response as XML
    fs.writeFile("req.txt", reqB, function (err) {
      if (err) {
    console.log(err)
    } else {
    console.log("it worked!");
    response.send(twiml);

    }
  });


});






// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 80);
// app.listen(3000);
