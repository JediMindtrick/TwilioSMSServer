console.log(process.env.TWILIO_SID);
console.log(process.env.TWILIO_TOK);

// Twilio Credentials
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOK;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
	to: "+16062803817",
	from: "+18594390183",
	body: "Hey there from twilio!",
}, function(err, message) {
	console.log(message.sid);
});
