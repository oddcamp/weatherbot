var Slack = require('slack-node');
apiToken = process.env.SLACK_TOKEN;
slack = new Slack(apiToken);

var channel = process.argv[2] ? "#"+process.argv[2] : '#kollegorna-ivan';

console.log(channel);

var postMessage = function (message) {
	var icon_url = 'https://cdn.rawgit.com/kollegorna/weatherbot/master/bot.jpg';
	slack.api(
		'chat.postMessage',
		{ text: message, channel: channel, username: 'weatherbot', icon_url: icon_url },
		function () {
			console.log("Message sent to " + channel + ": " + message);
		}
	);
};

var weather = require('./weather');
weather.postWeatherMessages(postMessage);
