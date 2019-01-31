import React from 'react';
import PropTypes from 'prop-types';
import './weatherTile.css';

const Day = ({ day }) => {
  return (
    <span className="day">
     { day }
    </span>
  );
};

const WeatherIcon = ({ classIcon }) => (
  <span className="icon">
    <i className={ `wi ${classIcon}` }/>
  </span>
);

const MinMaxTemp = ({ temp }) => {
  const { max, min } = temp;

  return (
    <span className="temp">
      <span className="max">{ max }<sup>&deg;</sup></span>
      <span className="min">{ min }<sup>&deg;</sup></span>
    </span>
  );
}

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

Day.propTypes = {
  day: PropTypes.string.isRequired
};

WeatherIcon.propTypes = {
  classIcon: PropTypes.string.isRequired
};

MinMaxTemp.propTypes = {
  temp: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
  }).isRequired
};

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
