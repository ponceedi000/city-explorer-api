'use strict';
const cacheDB = {
  weather: {},
  movies: {},
};

checkCache = (key, searchQuery) => {
  console.log("here");
  if (cacheDB[key][searchQuery]) {
    return cache[key][searchQuery];
  } else {
    return false;
  }
}

module.exports = { cache, checkCache };