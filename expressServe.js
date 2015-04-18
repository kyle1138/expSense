var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var app = express();
var msgArr = [];
var reqB;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var string = "";
  msgArr.forEach(function(msg){
    string += '<br>' + msg;
  })
  response.send(reqB);
});

app.post('/sms', twilio.webhook({
    validate:false
}), function(request, response) {
    console.log(request);
    reqB = request;
    console.log(request[body]);
    // Create a TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.message('Hello from Heroku node.js!');

    // Render the TwiML response as XML
    response.send(twiml);
});






// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 8080);
// app.listen(3000);
