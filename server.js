'use strict'

//So we can use variables from the .env file
require('dotenv').config();

//Getting the express library to create an app
const express = require('express');

//Getting the cors library to handle errors
const cors = require('cors');

//Application Setup
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send('Home Page!');
  });

app.get('/location', (request, response) => {
    const geoData = require('./data/geo.json');
    const requestCity = request.query.city;
    const locationEnteries = new Location (requestCity, geoData);
    response.status(200).json(locationEnteries);
})

app.get('/weather', (request, response) => {
    const weatherData = require('./data/darksky.json');
    let weatherDataArr = [];
    for (let i = 0; i < weatherData.data.length; i++){
    const weatherEnteries = new LocationWeather (weatherData.data[i]);
    weatherDataArr.push(weatherEnteries);

}
    response.status(200).json(weatherDataArr);

})

app.use('*', notFoundHandler);

//Constructor to change to the right format of data
function Location (requestCity, geoData){
    this.search_query = requestCity;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

function LocationWeather (weatherData){
    let dateString = new Date(weatherData.valid_date);
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: '2-digit' };
    let formattedTime = dateString.toLocaleDateString('en-US', options).split(',').join(' ');
    // console.log(formattedTime);

    this.forcast = weatherData.weather.description;
    this.time = formattedTime;
}

//Helper Functions
function notFoundHandler(request, response) {
    response.status(404).send('NOT FOUND!!');
  }

app.listen(PORT, () => console.log(`We're Live on port ${PORT} BB`));