import React, { Component } from 'react';
import WeatherTile from './WeatherTile';

const CITY_ID = 7531202; //Pruszcz Gdański
const API = `http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=metric&APPID=b4edeb90c9c076527cc408b60c7c397e`;

const mapStringToIcons = new Map();

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.arrayOfDay = null;
    this.tileData = null;

    mapStringToIcons.set(this, {
      Clear: 'wi-day-sunny',
      Cloud: 'wi-cloud',
      Rain: 'wi-rain',
      Snow: 'wi-snow',
    });
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .then(() => {
        this.arrayOfDay = this.groupByDay(this.state.data.list);

        this.tileData = this.createTileData();
        console.log(this.tileData);
      })
      .catch(error => console.error(error));
  }

  groupByDay(arr) {
    return arr.reduce((acc, next) => {
      const date = new Date(next.dt * 1000);
      const dateString = date.toString();
      const weekDay = dateString.substring(0, 3);

      if (!acc[weekDay]) {
        acc[weekDay] = [];
      }

      acc[weekDay].push(next);

      return acc;
    }, {});
  }

  getDay() {
    return Object.keys(this.arrayOfDay);
  }

  getTemp() {
    const weekDay = this.getDay();

    return weekDay.map((day) => {
      return this.arrayOfDay[day].reduce((acc, next) => {
        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(next.main.temp);

        return acc;
      }, {});
    });
  }

  getIcons() {
    const weekDay = this.getDay();

    return weekDay.map((day) => {
      return this.arrayOfDay[day].reduce((acc, next) => {
        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(next.weather[0].main);

        return acc;
      }, {});
    });
  }

  countIcons(icons) {
    return icons.map((icon) => {
      const dayName = Object.getOwnPropertyNames(icon)[0];

      return icon[dayName].reduce((acc, next) => {
        acc[next] = (acc[next] + 1) || 1;

        return acc;
      }, {});
    });
  }

  maxIcon(countIcons) {
    return countIcons.map((day) => {
      let entries = Object.entries(day);
      let values = Object.values(day);
      let max = Math.max(...values);
      let arr = [];

      entries.forEach((item, index) => {
        if (item.includes(max)) {
          arr.push(item[0]);
        }
      });

      return arr;
    });
  }

  createTileData() {
    const temps = this.getTemp();
    const icons = this.getIcons();
    const countIcons = this.countIcons(icons);
    const max = this.maxIcon(countIcons);
    const stringToIcons = mapStringToIcons.get(this);

    return temps.map((temp, index) => {
      const dayName = Object.getOwnPropertyNames(temp)[0];

      return { [dayName]: {
        day: dayName,
        temp: {
          max: Math.max(...temp[dayName]),
          min: Math.min(...temp[dayName])
        },
        classIcon: stringToIcons[max[index][0]]
      }}
    });
  }

  render() {
    return (
      <div>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[0] : fakeData.tue }/>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[1] : fakeData.wen }/>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[2] : fakeData.thu }/>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[3] : fakeData.fri }/>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[4] : fakeData.sat }/>
        <WeatherTile dayWeather={ this.tileData ? this.tileData[5] : fakeData.tue }/>
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
  sun: {
    day: 'Sun',
    temp: {
      max: 3,
      min: -9
    },
    classIcon: 'wi-rain-wind'
  },
};

export default WeatherApp;
