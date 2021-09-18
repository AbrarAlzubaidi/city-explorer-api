'use strict';

const axios = require('axios');
const ForecastWeather = require('../model/weather');

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

module.exports= handleWeatherData;