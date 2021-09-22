'use strict';
//allows us to use the config method to access our .env file
require('dotenv').config();
// the library we use in node to set up our server
const express = require('express');
const cors = require('cors');
//port number from .env file
const PORT = process.env.PORT || 3000;
const app = express();
// middleware
app.use(cors());
//weather data from json file
const weatherData = require('./data/weather.json');



app.get('/', (request, response) => {
  response.status(200).send('HOME');
});




//constructor function for Forecast
app.get('/weather', (request, response) => {

let cityName = request.query.city_name;

let weatherInfo = weatherData.find((item) => {
  if(item.city_name === cityName) {
    return item;
  }
});

try {
  const newArray = weatherInfo.data.map((x) => {
    return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);
  });
  response.send(newArray);
} catch(error) {
  console.log(error);
}
class Forecast {
  constructor(dateOne, descriptionOne, latOne, lonOne) {
    this.date = dateOne;
    this.description = descriptionOne;
    this.lat = latOne;
    this.lon = lonOne
  }
}

//let newArray = weatherInfo.data.map(x => {
//return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);

// response.send(newArray);
});



app.get('*', (request, response) => {
  response.status(404).send('Not found');
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));