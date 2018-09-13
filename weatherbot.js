var Slack = require('slack-node');
apiToken = process.env.SLACK_TOKEN;
slack = new Slack(apiToken);

var Forecast = require('forecast');
var forecast = new Forecast({
  service: 'forecast.io',
  key: process.env.FORECAST_KEY,
  units: 'celcius',
  cache: true,
  ttl: {
    minutes: 5
  }
});

var weatherIcons = {
	"clear-day" : ":sunny:",
	"clear-night" : ":full_moon_with_face:",
	"rain" : ":umbrella:",
	"snow" : ":snowflake:",
	"sleet" : ":snowflake:",
	"wind" : ":wind_blowing_face:",
	"fog" : ":foggy:",
	"cloudy" : ":cloud:",
	"partly-cloudy-day" : ":cloud:",
	"partly-cloudy-night" : ":cloud:"
};

/**
 * Constructor
 */
var Weatherbot = module.exports = function(options) {
	this.iconUrl = 'https://cdn.rawgit.com/kollegorna/weatherbot/master/assets/bot.png';
	this.channel = options.channel;

	if (options.locations) {
		this.locations = options.locations;
	} else {
		this.locations = [
			{
				name: "Trnava",
				coords: [48.3775,17.5883],
				people: ["Ivan"]
			},
			{
				name: "Stockholm",
				coords: [59.3294,18.0686],
				people: ["Henrik", "Per", "Filippos", "Magnus"]
			},
			{
				name: "Punta Cana",
				coords: [18.6484,-68.5988],
				people: ["Raymall"]
			},
			{
				name: "Braga",
				coords: [41.5472,-8.4464],
				people: ["Eduardo"]
			},
      {
				name: "Helsingborg",
				coords: [56.0464674, 12.6945121],
				people: ["Dennis"]
			},
      {
				name: "Plovdiv",
				coords: [42.1440,24.6708],
				people: ["Nikolay"]
			},
      {
				name: "Klaipėda",
				coords: [55.7052,21.0178],
				people: ["Osvaldas"]
			},
      {
				name: "Lisbon",
				coords: [38.7436,-9.1952],
				people: ["Ricardo"]
			},
      {
				name: "Cracow",
				coords: [50.0646501,-19.9449799],
				people: ["Kuba"]
			}
		];
	}
}

Weatherbot.prototype.postWeatherMessages = function () {
	var self = this;

	this.locations.forEach(function (location) {

		// Retrieve weather information from coordinates
		forecast.get(location.coords, function(err, weather) {
		  if (err) return console.dir(err);

		  var currentWeather = weather.currently;
		  var icon = weatherIcons[currentWeather.icon] ? weatherIcons[currentWeather.icon] + ' ' : ''; // 'clear-day'

		  var message = "Hello " + location.people.join(", ") + ". It's currently " +
		  	currentWeather.summary + ", " + icon + Math.round(currentWeather.temperature) +
		  	"°C (feels like " + Math.round(currentWeather.apparentTemperature) + " °C) in " + location.name;

			self.postMessage(message);
		});

	});
};

Weatherbot.prototype.postMessage = function (message) {
	var self = this;

	slack.api(
		'chat.postMessage',
		{ text: message, channel: self.channel, username: 'weatherbot', icon_url: self.iconUrl },
		function () {
			console.log("Message sent to " + self.channel + ": " + message);
		}
	);
};
