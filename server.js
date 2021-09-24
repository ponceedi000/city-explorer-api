'use strict';
// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Modules
const { handleGetMovies } = require('./modules/movies.js');
const { handleGetWeather } = require('./modules/weather.js');

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
app.get('/*', errorHandler);
function errorHandler(request, response) {
  response.status(404).send('Something went wrong');
}

// Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
