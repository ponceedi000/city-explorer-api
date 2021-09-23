'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

// const axios = require('axios');

const PORT = process.env.PORT || 3001;
const weatherData = require('./data/weather.json');

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get('/', (request, response) => {
  response.status(200).send('goto: localhost:3001/weather');
});

// WEATHER
app.get('/weather', (request, response) => {
  let weatherArray = [];
  let lat = request.query.lat;
  let lon = request.query.lon;
  const weatherResponse = weatherData.find(
    citySearched =>
      citySearched.city_name === request.query.searchQuery &&
      citySearched.lat === lat &&
      citySearched.lon === lon
  );

  if (weatherResponse) {
    weatherArray = weatherResponse.data.map(
      forecast =>
        new Forecast(forecast.valid_date, forecast.weather.description)
    );
    response.status(200).send(weatherArray);
  } else {
    response.status(400).send('City not found');
  }
});

// Errors
app.get('*', errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Something went wrong');
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));





// <------FALLBACK CODE----> <---Demo Url---> http://localhost:3000/weather?searchQuery=Seattle&lon=-122.33207&lat=47.60621

// 'use strict';

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();

// const PORT = process.env.PORT || 3001;
// const URL = process.env.URL


// const weatherData = require('./data/weather.json');

// app.use(cors());

// //SERVER URL ----> https://city-explorer-eddie.herokuapp.com/

// //------GETS--------
// app.get('/', (request, response) => {
//   response.status(200).send('HOME!!!!');
// });



// //Grabs data from weather Json
// app.get('/weather', (request, response) => {

//   let cityName = request.query.searchQuery;
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   if (cityName) {
//     cityName = cityName.toLowerCase();
//   };
// // server will try to find match from client input, if found it will also find lat/lon data associated with city name
//   try {
//     const weatherInfo = weatherData.find((citySearched) =>
//       citySearched.city_name.toLowerCase() === cityName &&
//       citySearched.lat === lat &&
//       citySearched.lon === lon
//     );
//     response.send(createWeather(weatherInfo))
// // if try = false then send an error message
//   } catch (error) {
//     response.status(404).send(`${cityName} not found`);

//   }
//   // grabs info required for constructor function below
// function createWeather(weatherInfo) {
//   const weatherReadings = weatherInfo.data.map((day) => {
//     const date = day.datetime;
//     const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
//     return new Forecast(date, description)
//   });
//   return weatherReadings;
// }

// });

// class Forecast {
//   constructor(date, description) {
//     this.date = date;
//     this.description = description
//   }
// }

// app.get('/*', (request, response) => {
//   response.status(404).send('Not found');
// })


// app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));






