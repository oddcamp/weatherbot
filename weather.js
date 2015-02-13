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

var locations = [
	{
		name: "Trnava",
		coords: [48.3775, 17.5883],
		people: ["Ivan"]
	},
	{
		name: "Seoul",
		coords: [37.5667, 126.9781],
		people: ["Samuel"]
	},
	{
		name: "Stockholm",
		coords: [59.3294, 18.0686],
		people: ["Filippos", "Henrik", "Per"]
	},
	{
		name: "Valencia",
		coords: [39.4667, 0.3833],
		people: ["Joakim"]
	},
	{
		name: "Jönköping",
		coords: [57.7828, 14.1606],
		people: ["Urban"]
	}
];

function iconUrl(baseUrl, iconName) {
	return baseUrl + iconName + ".png";
}

var postWeatherMessages = function (messenger) {
	locations.forEach(function (location) {

		// Retrieve weather information from coordinates
		forecast.get(location.coords, function(err, weather) {
		  if (err) return console.dir(err);

		  var currentWeather = weather.currently;
		  var icon = currentWeather.icon; // 'clear-day'

		  var message = "Hello " + location.people.join(", ") + ". It's currently " +
		  	currentWeather.summary + ", " + Math.round(currentWeather.temperature) + "°C in " + location.name; //+ ".\n" + iconUrl(iconsBaseUrl, icon);

			messenger(message);
		});

	});
};

exports.postWeatherMessages = postWeatherMessages;
