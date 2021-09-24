'use strict';

const axios = require('axios')


async function handleGetMovies(req, res) {
  const { searchQuery } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`
  const moviesResponse = await axios.get(url)

  res.send(moviesResponse.data.results);

}

module.exports = { handleGetMovies };
