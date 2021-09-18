'use strict';

const axios = require('axios');
const ForecastWeather = require('../model/weather');
const WeatherCache = require('../helpers/weatherCache');

let cache = new WeatherCache();

let handleWeatherData = async (req, res) => {
    // define and get the query parameters
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    //set it into the API link
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    if (cache.weatherData.length) {
        res.status(200).send(cache.weatherData);
    } else {
        // this response to get data and set it into response var
        let response = await axios.get(url);
        // take weather data and set it inside weatherData array
        let weatherData = response.data;
        // filter the previous array by mao the previous one and get some info that i nedd it
        let filterdData = weatherData.data.map(value => {
            return new ForecastWeather(value.datetime, value.weather.description)
        })
        cache.weatherData=filterdData;
        if (filterdData) {
            // send to localstorage filteredData as json file
            res.status(200).send(cache.weatherData);
            console.log('data from api',cache.weatherData)
        } else {
            res.status(500).send('error');

        }
        
    }

}

module.exports = handleWeatherData;