import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import WeatherTile from './WeatherTile';

const CITY_ID = 7531202; //Pruszcz Gdański
const API = `http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=metric&APPID=b4edeb90c9c076527cc408b60c7c397e`;

const mapStringToIcons = new Map();

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
      isLoading: false
    };

    this.arrayOfDay = null;
    this.tileData = null;

    mapStringToIcons.set(this, {
      Clear: 'wi-day-sunny',
      Clouds: 'wi-cloud',
      Rain: 'wi-rain',
      Snow: 'wi-snow',
    });
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.arrayOfDay = this.groupByDay(data.list);

        this.tileData = this.createTileData();
        this.setState({ data, isLoading: true });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
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
    const stringToIcon = mapStringToIcons.get(this);

    return temps.map((temp, index) => {
      const dayName = Object.getOwnPropertyNames(temp)[0];

      return {
        day: dayName,
        temp: {
          max: Math.max(...temp[dayName]),
          min: Math.min(...temp[dayName])
        },
        classIcon: stringToIcon[max[index][0]]
      };
    });
  }

  render() {
    const { data, error, isLoading } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;

    } else if (!isLoading) {
      return <div>Loading...</div>;

    } else {
      console.log(this.tileData);
      return (
        <Router>
          <div>
            <h2>{ data.city.name }</h2>
            <Link to={ this.tileData[0].day }>
              <WeatherTile dayWeather={ this.tileData[0] }/>
            </Link>
            <Link to={ this.tileData[1].day }>
              <WeatherTile dayWeather={ this.tileData[1] }/>
            </Link>
            <Link to={ this.tileData[2].day }>
              <WeatherTile dayWeather={ this.tileData[2] }/>
            </Link>
            <Link to={ this.tileData[3].day }>
              <WeatherTile dayWeather={ this.tileData[3] }/>
            </Link>
            <Link to={ this.tileData[4].day }>
              <WeatherTile dayWeather={ this.tileData[4] }/>
            </Link>
            <Link to={ this.tileData[5].day }>
              <WeatherTile dayWeather={ this.tileData[5] }/>
            </Link>

          </div>
        </Router>
      );
    }
  }
}

export default WeatherApp;
