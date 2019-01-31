import React from 'react';
import WeatherTile from './WeatherTile';

const WeatherApp = () => (
  <div>
    <WeatherTile dayWeather={ testWeather.tue }/>
    <WeatherTile dayWeather={ testWeather.wen }/>
    <WeatherTile dayWeather={ testWeather.thu }/>
    <WeatherTile dayWeather={ testWeather.fri }/>
    <WeatherTile dayWeather={ testWeather.sat }/>
  </div>
)

const testWeather = {
  tue: {
    day: 'Tue',
    temp: {
      max: 23,
      min: 12
    },
    classIcon: 'wi-day-storm-showers'
  },
  wen: {
    day: 'Wen',
    temp: {
      max: 23,
      min: 15
    },
    classIcon: 'wi-rain-wind'
  },
  thu: {
    day: 'Thu',
    temp: {
      max: 3,
      min: -1
    },
    classIcon: 'wi-lightning'
  },
  fri: {
    day: 'Fri',
    temp: {
      max: 33,
      min: 21
    },
    classIcon: 'wi-day-sunny'
  },
  sat: {
    day: 'Sat',
    temp: {
      max: 13,
      min: 9
    },
    classIcon: 'wi-day-cloudy-high'
  },
};

export default WeatherApp;
