var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("sense.db");
var app = express();
var msgArr = [];
var reqB;

app.set('port', (process.env.PORT || 5000));
app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/messages', function(request, response) {
  db.all("SELECT * FROM users", function(err, uRow) {


    uRow.forEach(function(user){
    //for (var phone in uRow) {



      console.log('user info is ' + user.phone);
      db.all("SELECT * FROM messages WHERE phone = ?", user.phone, function(err, mRow){
        if(err){ throw err;}
        console.log('mRow is > ' + mRow);
        user['messages'] = mRow;
      })

    })

  //  }




  // var string = "";
  // msgArr.forEach(function(msg){
  //   string += '<br>' + msg;
  // })
  console.log(uRow);
  setTimeout(function(){response.json(uRow)},100);
});
});



app.post('/sms', twilio.webhook({
    validate:false
}), function(request, response) {

  var rPhone = request['body']['From'];
  var rBody = request['body']['Body'];



  db.get("SELECT * FROM users WHERE phone = ?", rPhone, function(err, row) {
    if(row){
      db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , rBody, rPhone,true, function(err){});
    }else{
    db.run("INSERT INTO users (phone) VALUES (?)", rPhone, function(err) {
    if(err) { throw err; }
    // var id = this.lastID; //weird way of getting id of what you just inserted
    db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , rBody, rPhone,true, function(err) {
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
    response.send(twiml);
});


app.post('/operator', function(request, response) {

  console.log(request);
  var sent = JSON.parse(request);
  db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , sent['body']['body'], sent['body']['phone'],false, function(err) {
    if(err) { throw err; }

  });




    // Create a TwiML response

    // Render the TwiML response as XML
    // response.send(twiml);
});





// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 80);
// app.listen(3000);
