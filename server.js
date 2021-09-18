'use strict';
const express = require('express');
const app = express(); // class that create a new API
const cors = require('cors');
const axios = require('axios');
app.use(cors()); // connect API with cors
require('dotenv').config(); // import dotenv
const handleWeatherData= require('./controllers/weather');
const handleMovieData=require('./controllers/movie');
const PORT = process.env.PORT;

app.get('/', (res, req) => {
    res.send('home route')
})
app.get('/weather', handleWeatherData)

//=======================================
app.get('/movies', handleMovieData)

app.listen(PORT, () => {
    console.log('hello');
});

