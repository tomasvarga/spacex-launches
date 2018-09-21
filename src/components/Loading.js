import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div style={{ marginTop: '20px' }}>
      Loading...
    </div>
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
