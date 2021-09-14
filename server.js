'use strict';
const express = require('express');
const app = express(); // class that create a new API
const cors = require('cors');
app.use(cors()); // connect API with cors
require('dotenv').config(); // import dotenv
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('hello');
});

app.get('/weather', (req, res) => {
    // define and get the query parameters
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let searchQuery= req.query.searchQuery;

    // after getting the parameters get the cities that hold these parameters
    if (lat && lon || searchQuery) {
        let data = [];
        // check if the parameters in the weather data or not if it is true then push it inside array
        weatherData.find(value => {
            (value.lat === lat && value.lon === lon || value.searchQuery=== searchQuery) && data.push(value);
        })
        console.log('data', data);

        let city = data[0];
        console.log('city', city);

        if (data.length > 0) {
            let forecast = city.data.map(value => {
                return {
                    date: value.datetime,
                    description: value.weather.description
                }
            })
            res.status(200).json(forecast);
        } else {
            alert('Error404: city not found')
            //send(" Error: city not found")
        }
    } else {
        res.status(400).send("Error: on Query Parameters");
    }
})
