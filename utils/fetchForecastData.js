const axios = require('axios');

/**
 * Dark Sky By Apple
 * https://darksky.net/forecast/40.7127,-74.0059/us12/en
 *
 * * Weather stack
 * * https://weatherstack.com
 * * Current Weather API Endpoint
 * * http://api.weatherstack.com/current? access_key = YOUR_ACCESS_KEY & query = New York
 * * optional parameters: 
      & units = m
      & language = en
      & callback = MY_CALLBACK
 */

const fetchForecastData = async (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_ACCESS_KEY}&query=${latitude}, ${longitude}&units=m`;
  try {
    const response = await axios({
      url,
      method: 'GET',
    });
    const { data } = await response;

    if (data.error) {
      callback('Unable to find location', undefined);
    } else {
      const { request, location, current } = data;
      const forecastDescription =
        current.weather_descriptions[0] +
        ' It is currently ' +
        current.temperature +
        ' degress out. There is a ' +
        current.humidity +
        '% humidity. ' +
        current.precip +
        '% probability of precipitation.';
      callback(undefined, forecastDescription);
    }
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
    callback('Unable to connect to weather service.', undefined);
  }
};

module.exports = fetchForecastData;
