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
var aOne = '';
var aTwo = '';



console.log(process.env.TWILIO_ACCOUNT_TOKEN);
console.log(process.env.TWILIO_ACCOUNT_SID);


var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);


app.set('port', (process.env.PORT || 5000));
app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/messages', function(request, response) {
  db.all("SELECT * FROM users", function(err, uRow) {


    uRow.forEach(function(user){
    



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
    //response.send(twiml);
});


app.post('/operator', function(request, response) {

  var sent = request;


  client.sms.messages.create({
      to:'+' + sent['body']['phone'].toString(),
      from:'2132973673',
      body:sent['body']['body']
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , sent['body']['body'], sent['body']['phone'],false, function(err) {
            if(err) { throw err; }

          });
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.');
          console.log(error);
      }
  });





  console.log(request);

  // db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , sent['body']['body'], sent['body']['phone'],false, function(err) {
  //   if(err) { throw err; }
  //
  // });




    // Create a TwiML response

    // Render the TwiML response as XML
    // response.send(twiml);
});




// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 80);
// app.listen(3000);
