const axios = require('axios');

/**
 * * Geocoding
 * * https://www.mapbox.com/
 * * Address => Lat/Long => Weather
 */

 const fetchGeocodingData = async (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?proximity=-74.70850,40.78375&access_token=${
    process.env.MAP_BOX_GL_ACCESS_TOKEN
  }`;

  try {
    const response = await axios({
      url: geocodeUrl,
      method: 'GET',
    });
    const { data } = await response;
    const { features } = data;

    if (features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const [longitude, latitude] = features[0].center;
      const location = features[0].place_name;

      callback(undefined, { latitude, longitude, location });
    }
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
    callback('Unable to connect to geocoding service.', undefined);
  }
};

module.exports = fetchGeocodingData;
