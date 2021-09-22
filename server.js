'use strict';
//allows us to use the config method to access our .env file
require('dotenv').config();
// the library we use in node to set up our server
const express = require('express');
const cors = require('cors');
//port number from .env file
const PORT = process.env.PORT || 3000;
const app = express();
//weather data from json file
const weatherData = require('./data/weather.json');
// middleware
app.use(cors());



//------GETS--------
app.get('/', (request, response) => {
  response.status(200).send('HOME');
});
//-------------------



//Grabs data from weather Json
app.get('/weather', (request, response) => {

  let cityName = request.query.searchQuery;
  let lat = request.query.lat;
  let lon = request.query.lon;
  if (cityName) {
    cityName = cityName.toLowerCase();
  };
// server will try to find match from client input, if found it will also find lat/lon data associated with city name
  try {
    const weatherInfo = weatherData.find((citySearched) =>
      citySearched.city_name.toLowerCase() === cityName &&
      citySearched.lat === lat &&
      citySearched.lon === lon
    );
    response.send(createWeather(weatherInfo))
// if try = false then send an error message
  } catch (error) {
    response.status(404).send('City Not found');

  }
  // grabs info required for constructor function below
function createWeather(weatherInfo) {
  const weatherReadings = weatherInfo.data.map((day) => {
    const date = day.datetime;
    const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    return new Forecast(date, description)
  });
  return weatherReadings;
}

});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description
  }
}

app.get('/*', (request, response) => {
  response.status(404).send('Not found');
})


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));


// <------FALLBACK CODE------>

// // Forecast constructor <---Demo Url---> http://localhost:3000/weather?searchQuery=Seattle&lon=-122.33207&lat=47.60621
// class Forecast {
//   constructor(data) {
//     this.date = data.map(day => day.datetime);
//     this.description = data.map(day => day.weather.description);

//   }
// }

// //weather data will route here
// app.get('/weather', (request, response) => { 
//   let newArray = [];
//   let cityName = request.query.searchQuery;
//   weatherData.find(item => {
//     if (item.city_name === cityName) {
//       let date = item.data.map(day => day.datetime);
//       let description = item.data.map(day => day.weather.description);
//       newArray.push(new Forecast(item.data));
//     }
//   });
//   if (newArray.length > 0){
//     response.send(newArray);
//   }
//   else{
//     response.status(500).send('Something Went Wrong');
//   }

// });


