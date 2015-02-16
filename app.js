if (!process.argv[2]) {
	console.error("No channel specified! \nExample: node app.js general")
	process.exit();
}

var Weatherbot = require('./weatherbot');
var options = {
	channel: "#"+process.argv[2]
};
new Weatherbot(options).postWeatherMessages();
