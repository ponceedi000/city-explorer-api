'use strict';
//allows us to use the config method to access our .env file
require('dotenv').config();
// the library we use in node to set up our server
const express = require('express');
const cors = require('cors');
//weather data from json file
const weatherData = require('./data/weather.json');
//port number from .env file
const PORT = process.env.PORT || 3000;
const app = express();
// middleware
app.use(cors());


app.get('/', (request, response) => {
  response.status(200).send('I am home at last!');
});

app.get('/weatherData', (request, response) => {

let cityName = request.query.cityName;

let weatherInfo = weatherData.find((item) => {
  if(item.city_name === cityName) {
    return item;
  }
});
class Forecast {
  constructor(dateOne, descriptionOne, latOne, lonOne) {
    this.date = dateOne;
    this.description = descriptionOne;
    this.lat = latOne;
    this.lon = lonOne
  }
}

let newArr = weatherInfo.data.map(x => {
  return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);
});

response.send(newArr);
console.log(newArr)
});



app.get('*', (request, response) => {
  response.status(404).send('Not found');
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));