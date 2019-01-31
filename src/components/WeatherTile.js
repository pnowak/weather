import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import WeatherIcon from './WeatherIcon';
import MinMaxTemp from './MinMaxTemp';
import './weatherTile.css';

const WeatherTile = ({ dayWeather }) => {
  return (
    <div className="weather">
      <Day day={ dayWeather.day }/>
      <div className="content">
        <WeatherIcon classIcon={ dayWeather.classIcon }/>
        <MinMaxTemp temp={ dayWeather.temp }/>
      </div>
    </div>
  );
}

WeatherTile.propTypes = {
  dayWeather: PropTypes.shape({
    temp: PropTypes.shape({
      max: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired
    }),
    classIcon: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
  }).isRequired
};

export default WeatherTile;
