'use strict';
const express = require('express');
const app = express(); // class that create a new API
const cors = require('cors');
const axios = require('axios')
app.use(cors()); // connect API with cors
require('dotenv').config(); // import dotenv
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('hello');
});
app.get('/', (res, req) => {
    res.send('home route ^^')
})

let handleWeatherData = async (req, res) => {
    // define and get the query parameters
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    //set it into the API link
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    // this response to get data and set it into response var
    let response = await axios.get(url);
    // take weather data and set it inside weatherData array
    let weatherData = response.data;
    // filter the previous array by mao the previous one and get some info that i nedd it
    let filterdData = weatherData.data.map(value => {
        return new ForecastWeather(value.datetime, value.weather.description)
    })
    // send to localstorage filteredData as json file
    res.status(200).json(filterdData)
}

app.get('/weather', handleWeatherData)


class ForecastWeather {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

//=======================================

let handleMovieData = async (req, res) => {
    // define and get the query parameters
    let searchQuery = req.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    let response = await axios.get(url);
    let movieData = response.data;
    console.log(searchQuery);

    let filterdData = movieData.results.map(value => {
        return new ForecastMovie(value.title, value.overview, value.vote_average, value.vote_count, value.poster_path, value.popularity, value.release_date)
    })
    res.status(200).send(filterdData);
    }

class ForecastMovie {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.poster_path =`https://image.tmdb.org/t/p/w500/${poster_path}`;
        this.popularity = popularity;
        this.release_date = release_date;
    }

}
console.log(ForecastMovie.poster_path);

app.get(`/movies`, handleMovieData)