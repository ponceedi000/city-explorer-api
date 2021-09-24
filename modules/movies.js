'use strict';

const axios = require('axios');
const { response } = require('express');

class Movie {
  constructor(data) {
    this.data = data;
  }
}

async function handleGetMovies(req, res) {
  try {
    const { searchQuery } = req.query;
    let resultsArray = [];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`
    let moviesResponse = await axios.get(url);

    moviesResponse.data.results.map(movie => {
      resultsArray.push(new Movie(movie))
    });
    res.send(resultsArray);
  } catch (error) {
    console.log(error)
    res.status(404).send('Something went wrong with requested movie data!');
  }
  
}

module.exports = { handleGetMovies };