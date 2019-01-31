import React from 'react';
import PropTypes from 'prop-types';

const Day = ({ day }) => {
  return (
    <span className="day">
     { day }
    </span>
  );
};

Day.propTypes = {
  day: PropTypes.string.isRequired
};

export default Day;
