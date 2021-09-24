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
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}




async function handleGetWeather(request, response) {
  // let weatherArray = [];
  const { searchQuery } = request.query;

  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase();
  }
  let lat = request.query.lat;
  let lon = request.query.lon;
  if (searchQuery === undefined || lat === undefined || lon === undefined) {
    response.status(500).send("Recieved invalid information for one or more of the following: City name, latitude, longitude ")
  }

  try {    
    let weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
      let dailyForecast = getThreeDayForecast(weatherResponse.data);
      response.status(200).send(dailyForecast);
    
  } catch (error) {
    response.status(500).send('Requested city not found. Try again!');
  }
}

function getThreeDayForecast(cityData) {
  let forecastArray = [];
  if (!cityData.status === 200) {
    return forecastArray;
  }
  cityData.data.forEach((forecast) => {
    let description = `Low of ${forecast.app_min_temp}, high of ${forecast.app_max_temp}, with ${forecast.weather.description.toLowerCase()}`
    let date = forecast.datetime;
    forecastArray.push(new Forecast(date, description));
  });
  return forecastArray;
}
 
  




async function handleGetMovies(req, res) {
  const { searchQuery } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`
  const moviesResponse = await axios.get(url)


  res.send(moviesResponse.data.results);

}

module.exports = { handleGetWeather, handleGetMovies };
