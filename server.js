
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

	res.status(201).send("Hello to you {" + _from +"}!  You said '" + _body + "'");

/*
	client.messages.create({
		to: _from,
		from: _to,
		body: "Hello to you {" + _from +"}!  You said '" + _body + "'",
	}, function(err, message) {
		console.log(message.sid);
	});
	res.send(201);
	*/
});

http.createServer(app).listen(app.get('port'), function(){
 	console.log('Express server listening on port ' + app.get('port'));
});
