
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
// Twilio Credentials
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOK;
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
var twilio = require('twilio');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.basicAuth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD));

app.get('/',function(req,res) {
	res.send('OK');
});

app.get('/health',function(req,res) {
	res.send('A-OK');
});

app.get('/echo',function(req,res) {
	var _from = req.param('From');
	var _to = req.param('To');
	var _body = req.param('Body');

	var twiml = new twilio.TwimlResponse();

	twiml.sms("Hello to you {" + _from +"}!  You said '" + _body + "'");

	res.set('Content-Type', 'text/xml');
	res.send(200,twiml.toString());
});

http.createServer(app).listen(app.get('port'), function(){
 	console.log('Express server listening on port ' + app.get('port'));
});
