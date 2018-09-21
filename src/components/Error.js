import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ isError }) => {
  if (!isError) {
    return null;
  }
  return (
    <div style={{ marginTop: '20px', color: 'red' }}>
      Error! while loading data.
    </div>
  );
};

Error.propTypes = {
  isError: PropTypes.bool.isRequired,
};

export default Error;
