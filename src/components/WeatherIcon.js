import React from 'react';
import PropTypes from 'prop-types';

const WeatherIcon = ({ classIcon }) => (
  <span className="icon">
    <i className={ `wi ${classIcon}` }/>
  </span>
);

WeatherIcon.propTypes = {
  classIcon: PropTypes.string.isRequired
};

export default WeatherIcon;
