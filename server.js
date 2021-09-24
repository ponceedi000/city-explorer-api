'use strict';
// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const { handleGetWeather, handleGetMovies } = require('./routes');

// Globals
const PORT = process.env.PORT || 3001;
const app = express();
// const weatherData = require('./data/weather.json');

// Middleware
app.use(cors());





// Routes
app.get('/', (request, response) => {
  response.status(200).send('HOME');
});

app.get('/weather', handleGetWeather);

app.get('/movies', handleGetMovies);



// Errors
app.get('*', errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Something went wrong');
}

// Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));





// <------FALLBACK CODE----> <---Demo Url---> http://localhost:3000/weather?searchQuery=Seattle&lon=-122.3300624&lat=47.6038321

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






