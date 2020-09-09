var Slack = require("slack-node");
apiToken = process.env.SLACK_TOKEN;
slack = new Slack(apiToken);

var Forecast = require("forecast");
var forecast = new Forecast({
  service: "forecast.io",
  key: process.env.FORECAST_KEY,
  units: "celcius",
  cache: true,
  ttl: {
    minutes: 5
  }
});

var weatherIcons = {
  "clear-day": ":sunny:",
  "clear-night": ":full_moon_with_face:",
  rain: ":umbrella:",
  snow: ":snowflake:",
  sleet: ":snowflake:",
  wind: ":wind_blowing_face:",
  fog: ":foggy:",
  cloudy: ":cloud:",
  "partly-cloudy-day": ":cloud:",
  "partly-cloudy-night": ":cloud:"
};

/**
 * Constructor
 */
var Weatherbot = (module.exports = function(options) {
  this.iconUrl =
    "https://cdn.rawgit.com/kollegorna/weatherbot/master/assets/bot.png";
  this.channel = options.channel;

  if (options.locations) {
    this.locations = options.locations;
  } else {
    this.locations = [
      {
        name: "Trnava",
        coords: [48.3775, 17.5883],
        people: ["Ivan"]
      },
      {
        name: "Stockholm",
        coords: [59.3294, 18.0686],
        people: ["Per", "Ana"]
      },
      {
        name: "Braga",
        coords: [41.5472, -8.4464],
        people: ["Eduardo"]
      },
      {
        name: "Seoul",
        coords: [37.5650, 126.8494],
        people: ["Dennis"]
      },
      {
        name: "Plovdiv",
        coords: [42.144, 24.6708],
        people: ["Nikolay"]
      },
      {
        name: "Klaipėda",
        coords: [55.7052, 21.0178],
        people: ["Osvaldas"]
      },
      {
        name: "London",
        coords: [51.5006895, -0.1245838],
        people: ["Samuel"]
      },
      {
        name: "Nynäshamn",
        coords: [58.9656903,17.6048422],
        people: ["Joakim"]
      },
      {
        name: "Porto",
        coords: [41.157944,-8.629105],
        people: ["Diana"]
      },
      {
        name: "Lisbon",
        coords: [38.722252,-9.139337],
        people: ["Joana"]
      }
    ];
  }
});

Weatherbot.prototype.postWeatherMessages = function() {
  var self = this;

  this.locations.forEach(function(location) {
    // Retrieve weather information from coordinates
    forecast.get(location.coords, function(err, weather) {
      if (err) return console.dir(err);

      var currentWeather = weather.currently;
      var icon = weatherIcons[currentWeather.icon]
        ? weatherIcons[currentWeather.icon] + " "
        : ""; // 'clear-day'

      var message =
        "Hello " +
        location.people.join(", ") +
        ". It's currently " +
        currentWeather.summary +
        ", " +
        icon +
        Math.round(currentWeather.temperature) +
        "°C (feels like " +
        Math.round(currentWeather.apparentTemperature) +
        " °C) in " +
        location.name;

      self.postMessage(message);
    });
  });
};

Weatherbot.prototype.postMessage = function(message) {
  var self = this;

  slack.api(
    "chat.postMessage",
    {
      text: message,
      channel: self.channel,
      username: "weatherbot",
      icon_url: self.iconUrl
    },
    function() {
      console.log("Message sent to " + self.channel + ": " + message);
    }
  );
};
