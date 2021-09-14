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


let handleWeatherData = async (req, res) => {
    // define and get the query parameters
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let response = await axios.get(url);
    let weatherData = response.data;
    let filterdData = weatherData.data.map(value => {
        console.log(value.datetime)
        return new Forecast(value.datetime, value.weather.description)
    })
    res.status(200).json(filterdData)
}

app.get('/weather', handleWeatherData)

app.get('/', (res,req)=>{
    res.send('home route ^^')
})
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

//=======================================

// function handleMovieData=async(req,res) {
//     let url = `https://api.themoviedb.org/3/movie/76341?api_key=${process.env.MOVIE_API_KEY}`;
//     let response = await axios.get(url);
//     let movieData = response.data;
//     let filterdData = movieData.data.map(value => {
//         return new Forecast(value.datetime, value.weather.description)
//     })
//     res.status(200).json(filterdData)
// }

// app.get(`/movies`, handleMovieData)