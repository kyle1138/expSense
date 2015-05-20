var express = require('express');
var twilio = require('twilio');
// (process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var WSS = require("ws").Server;
var server = new WSS({port:4000});
var clients = [];
var msgLog = [];
var namListS = [];


var connections = [];
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var opPostCount = 0;

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("sense.db");

var app = express();

var msgArr = [];



var descriptors = ['red','white','blue','black', 'imperial', 'martial', 'presidential',
'easy','anonymous', 'galactic','federal','cyber','dark', 'the last','daring','jumping','wylde',
'dangerous','screaming','bad news' , 'american','star','night','iron','notorious',
'mysterious','glowing','singing','no-named'];

var namesForUsers = ['shirt','hat','agent','viper','jack','bill','fan','ranger','hero', 'villain',
 'swordsman', 'unicorn', 'gunfighter','rider','ranger','warrior','waiter','gangster',
 'outlaw','master','watcher','android','runner','hunter','robot','stallion','lord',
 'engineer','captain','scout','pilot','ninja','viking','avenger'];

var generatedUserNames = [];

var nameGenerator = function(){
    var unique = false;
    while (unique === false){
      unique = true;
      var frontIndex = Math.floor(Math.random() * descriptors.length);
      var backIndex = Math.floor(Math.random() * namesForUsers.length);
      var nameBuilt = descriptors[frontIndex] + " " + namesForUsers[backIndex];

      generatedUserNames.forEach(function(name){
          if(name === nameBuilt){unique = false}
        });

      }

    generatedUserNames.push(nameBuilt);
    return nameBuilt;

};

var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.set('port', (process.env.PORT || 5000));
app.use(cors());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/messages', function(request, response) {
  db.all("SELECT * FROM users WHERE active = 1", function(err, uRow) {


    uRow.forEach(function(user){


      console.log('user info is ' + user.phone);
      db.all("SELECT * FROM messages WHERE phone = ? AND open_ticket = ?", user.phone,true, function(err, mRow){
        if(err){ throw err;}

        user['messages'] = mRow;
      })

    })


  console.log(uRow);
  setTimeout(function(){response.json(uRow)},100);
});
});





app.put('/close_ticket', function(request, response) {
  console.log(request)
  // console.log(JSON.parse(request));
  // var ticketToClose = JSON.parse(request);

  db.all("UPDATE users SET active = 0 WHERE phone = ?",request['body']['phone'], function(err, row){
    if(err){
      throw err;
    }
    console.log(row);
  })



  db.all("UPDATE messages SET open_ticket = ? WHERE phone = ?", false,request['body']['phone'], function(err, row) {
    if(err){
      throw err;
    }
    console.log(row);
    setTimeout(function(){response.json('ticket closed')},100);
  });



});





server.on("connection" , function(ws){
  console.log("there has been a connection.")
  clients.push(ws);

  // post in websocket

  app.post('/sms', twilio.webhook({
      validate:false
  }), function(request, response) {

    var rPhone = request['body']['From'];
    var rBody = request['body']['Body'];
    console.log(rPhone + " <> " + rBody);


    db.get("SELECT * FROM users WHERE phone = ?", rPhone, function(err, row) {
      if(row){
        db.set("UPDATE users SET active = 1 WHERE phone = ?" , rPhone, function(err, row) {
          if(err) { throw err; }
        })
        db.run("INSERT INTO messages (body,phone,open_ticket,received) VALUES(?,?,?,?)" , rBody, rPhone,true,true, function(err){});

        var infoBack = JSON.stringify({phone:rPhone.slice(1,rPhone.length),message:rBody,handle:row.handle});
        clients.forEach(function(clientWs){clientWs.send(infoBack)});

      }else{
        var handleToAssign = nameGenerator();
      db.run("INSERT INTO users (phone,handle,active) VALUES (?,?,?)", rPhone, handleToAssign,true, function(err) {
      if(err) { throw err; }
      // var id = this.lastID; //weird way of getting id of what you just inserted
      db.run("INSERT INTO messages (body,phone,open_ticket,received) VALUES(?,?,?,?)" , rBody, rPhone,true,true, function(err) {
          if(err) { throw err; }

        });
      });
      var infoBack = JSON.stringify({phone:rPhone.slice(1,rPhone.length),message:rBody,handle:handleToAssign});
      clients.forEach(function(clientWs){clientWs.send(infoBack)});
    }


  });

      msgArr.push(request['body']['Body']);

      // Create a TwiML response
      var twiml = new twilio.TwimlResponse();
      twiml.message('Hello from express node.js!');

      // Render the TwiML response as XML
      //response.send(twiml);
  });






  ws.on("message" , function(msg){
    var opToUserMsg = JSON.parse(msg);
    client.messages.create({
        to:'+' + opToUserMsg['phone'].toString(),
        from:'2132973673',
        body:opToUserMsg['body']
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            db.run("INSERT INTO messages (body,phone,open_ticket,received) VALUES(?,?,?,?)" , opToUserMsg['body'], opToUserMsg['phone'],true,false, function(err) {
              if(err) { throw err; }

            });
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
            // clients.forEach(function(clientWs){clientWs.send(opToUserMsg)});
        } else {
            console.log('Oops! There was an error.');
            console.log(error);
        }
    });


  })

  ws.on("close" , function(){
    var escapee = clients.indexOf(ws);
    clients.splice(escapee,1);
    namListS.splice(escapee,1);
    console.log("somebody left");
    clients.forEach(function(user){user.send("A user has left the room")});

  })



})




app.post('/operator', function(request, response) {
  opPostCount ++;
  console.log('Operator Post Count is ' + opPostCount);
  var sent = request;
  var textBody = sent['body']['body'];


  // textArray.forEach(function(msgPart){
  client.messages.create({
      to:'+' + sent['body']['phone'].toString(),
      from:'2132973673',
      body:textBody
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          db.run("INSERT INTO messages (body,phone,received) VALUES(?,?,?)" , textBody, sent['body']['phone'],false, function(err) {
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

// });
    // Create a TwiML response

    // Render the TwiML response as XML
    // response.send(twiml);
});



//
// var accountSid = ;
// var authToken = "{{ auth_token }}";
// var clientBig = require('twilio')(tas, tat);
//
// console.log(tas);
//
// clientBig.messages.create({
//     body: "Jenny please?! I love y",
//     to: "+15165781916",
//     from: "+14158141829"
// }, function(err, message) {
//     process.stdout.write(message.sid);
// });
//
//
//
// var bigMessageURI = "/2010-04-01/Accounts/" + tas + "/Messages";
//

// var textArray = textBody.split('\n');
// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 1337);
// app.listen(3000);
