# weatherbot

![weatherbot](https://raw.githubusercontent.com/kollegorna/weatherbot/master/bot.jpg)

A Slack bot that fetches weather from predefined locations and posts it to our slack channel.
It uses [forecast.io API](http://forecast.io/) API and [Slack API](https://api.slack.com/).

This is what it looks like in Slack:
![screenshot](https://raw.githubusercontent.com/kollegorna/weatherbot/master/slack-screenshot.png)

## Configuration
You'll need [Slack token](https://api.slack.com/web) as well as [forecast.io API key](https://developer.forecast.io/). 
Weatherbot needs these tokens stored in ENV variables:

```
$ export SLACK_TOKEN=your_slack_token
$ export FORECAST_KEY=your_forecastio_key
```
I recommend [direnv](http://direnv.net/) for that purpose.

## Usage

```javascript
$ node app.js slack-channel-name
```

## Cron job (optional)
You can create a bash script and add it to cron so it runs every day at 9, for example:
```
# m h  dom mon dow   command
0 9 * * * /home/pi/code/weatherbot.sh
```

#### weatherbot.sh
```
#!/bin/bash
export SLACK_TOKEN=your_slack_token
export FORECAST_KEY=your_forecastio_key
cd /home/pi/code/weatherbot
/usr/local/bin/node app.js kollegorna
```


## Contributing

1. Fork it ( https://github.com/kollegorna/weatherbot/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
