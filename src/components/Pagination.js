import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';

const Pagination = ({ isPaginationActivated, onToNextPage }) => {
  if (!isPaginationActivated) {
    return null;
  }
  return (
    <PrimaryButton style={{ marginBottom: '20px' }} type="button" onClick={onToNextPage}>
      More...
    </PrimaryButton>
  );
};

Pagination.propTypes = {
  isPaginationActivated: PropTypes.bool.isRequired,
  onToNextPage: PropTypes.func.isRequired,
};


export default Pagination;
