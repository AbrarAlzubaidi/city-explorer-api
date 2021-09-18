'use strict';
const axios = require('axios');
const ForecastMovie = require('../model/movie');
const MovieCache = require('../helpers/movieCache');

let cache = new MovieCache();

let handleMovieData = async (req, res) => {
    // define and get the query parameters
    let searchQuery = req.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=Amman`;
    if (cache.movieData.length) {
        res.status(200).send(cache.movieData);
        console.log('data from cache', cache.movieData)
    } else {
        let response = await axios.get(url);
        let movieData = response.data;

        let filterdData = movieData.results.map(value => {
            return new ForecastMovie(value.title, value.overview, value.vote_average, value.vote_count, value.poster_path, value.popularity, value.release_date)
        })
        cache.movieData= filterdData;
        if (filterdData) {
            res.status(200).send(cache.movieData);
            console.log('data from api',cache.movieData)
        } else {
            res.status(500).send('error');

        }
    }



}

module.exports = handleMovieData;