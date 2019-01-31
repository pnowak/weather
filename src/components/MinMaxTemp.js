import React from 'react';
import PropTypes from 'prop-types';

const MinMaxTemp = ({ temp }) => {
  const { max, min } = temp;

  return (
    <span className="temp">
      <span className="max">{ max }<sup>&deg;</sup></span>
      <span className="min">{ min }<sup>&deg;</sup></span>
    </span>
  );
};

MinMaxTemp.propTypes = {
  temp: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
  }).isRequired
};

export default MinMaxTemp;
