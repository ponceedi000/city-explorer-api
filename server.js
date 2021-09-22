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


// Forecast constructor <---Demo Url---> http://localhost:3000/weather?searchQuery=Seattle&lon=-122.33207&lat=47.60621
class Forecast {
  constructor(data) {
    this.date = data.map(day => day.datetime);
    this.description = data.map(day => day.weather.description);

  }
}

//weather data will route here
app.get('/weather', (request, response) => {
  
  let newArray = [];
  let cityName = request.query.searchQuery;
  weatherData.find(item => {
    if (item.city_name === cityName) {
      let date = item.data.map(day => day.datetime);
      let description = item.data.map(day => day.weather.description);
      newArray.push(new Forecast(item.data));
    }
  });
  if (newArray.length > 0){
    response.send(newArray);
  }
  else{
    response.status(500).send('Something Went Wrong');
  }

});



// //constructor function for Forecast
// app.get('/weather', (request, response) => {

// let cityName = request.query.city_name;

// let weatherInfo = weatherData.find((item) => {
//   if(item.city_name === cityName) {
//     return item;
//   }
// });

// try {
//   const newArray = weatherInfo.data.map((x) => {
//     return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);
//   });
//   response.send(newArray);
// } catch(error) {
//   console.log(error);
// }
// class Forecast {
//   constructor(dateOne, descriptionOne, latOne, lonOne) {
//     this.date = dateOne;
//     this.description = descriptionOne;
//     this.lat = latOne;
//     this.lon = lonOne
//   }
// }

// //let newArray = weatherInfo.data.map(x => {
// //return new Forecast(x.valid_date, x.weather.description, weatherInfo.lat, weatherInfo.lon);

// // response.send(newArray);
// });


app.get('/*', (request, response) => {
  response.status(404).send('Not found');
})


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));


