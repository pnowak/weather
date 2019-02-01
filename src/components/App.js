import React, { Component } from 'react';
import WeatherTile from './WeatherTile';

const CITY_ID = 7531202; //Pruszcz Gdański
const API = `http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=metric&APPID=b4edeb90c9c076527cc408b60c7c397e`;

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({ data });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <WeatherTile dayWeather={ fakeData.tue }/>
        <WeatherTile dayWeather={ fakeData.wen }/>
        <WeatherTile dayWeather={ fakeData.thu }/>
        <WeatherTile dayWeather={ fakeData.fri }/>
        <WeatherTile dayWeather={ fakeData.sat }/>
      </div>
    );
  }
}

const fakeData = {
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
