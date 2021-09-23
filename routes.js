const axios = require('axios')


// app.get('/weather', async (request, response) => {
//   let weatherArray = [];
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   const weatherResponse = weatherData.find(
//     citySearched =>
//       citySearched.city_name === request.query.searchQuery &&
//       citySearched.lat === lat &&
//       citySearched.lon === lon
//   );

//   if (weatherResponse) {
//     weatherArray = weatherResponse.data.map(
//       forecast =>
//         new Forecast(forecast.valid_date, forecast.weather.description)
//     );
//     response.status(200).send(weatherArray);
//   } else {
//     response.status(400).send('City not found');
//   }
// });


async function handleGetWeather(req, res) {
  const { searchQuery } = req.query;
  const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/${this.state.searchQuery}?lat=${this.state.location.lat}&lon=${this.state.location.lon}&${process.env.REACT_APP_WEATHER_KEY}&include=minutely`)


res.send(moviesResponse.data.results);

}



async function handleGetMovies(req, res) {
  const { searchQuery } = req.query;
  const moviesResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.WEATHER_API_KEY}&query=${searchQuery}&page=1`)


res.send(moviesResponse.data.results);

}


module.exports = { handleGetWeather, handleGetMovies };