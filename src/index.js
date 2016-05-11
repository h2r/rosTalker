var KEY_CURRENT_TYPE = "messagetype";
var KEY_CURRENT_NAME = "name";
var KEY_CURRENT_PHONE = "phone";
var KEY_CURRENT_MESSAGE = "message";

var APP_ID = 'amzn1.echo-sdk-ams.app.82475233-31d2-47d0-8d70-70e18e994e44';

var AlexaSkill = require('./AlexaSkill');
var ROSLIB = require('roslib')
var sleep = require('sleep')

var ros = new ROSLIB.Ros({
    url : 'ws://138.16.160.16:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var speech = new ROSLIB.Topic({
    ros : ros,
    name : '/speech_recognition',
    messageType : 'std_msgs/String' 
});

var echoSpeech = new ROSLIB.Topic({
	ros : ros,
	name : '/echo_speech',
	messageType : 'std_msgs/String'
});

var echoSays = '';
echoSpeech.subscribe(function(message) {
	echoSays = message.data;
});

var helpText = "I can send a message to baxter";

var TM = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TM.prototype = Object.create(AlexaSkill.prototype);
TM.prototype.constructor = TM;

TM.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Session Started");
};

TM.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechOutput = "Welcome to the Humans To Robots Lab!, " + helpText;
    var repromptText = helpText;
	
    response.ask(speechOutput, repromptText);
};

TM.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Session Closed");
};

TM.prototype.intentHandlers = {
    "MessageIntent": function (intent, session, response) {
		var message = intent.slots.Message.value;
        var msg = new ROSLIB.Message({
            data : intent.slots.Message.value
        });
        speech.publish(msg);
        sleep.sleep(0.2);
	    response.ask(echoSays);
	    echoSays = '';
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask(helpText);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the TM skill.
    var tm = new TM();
    tm.execute(event, context);
};
