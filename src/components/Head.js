import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';

const Head = ({ title, imgSrc }) => (
  <AppHeader>
    <img src={imgSrc} height="100" width="100" alt="logo" />
    <h1 style={{ fontSize: '1.5em' }}>{title}</h1>
  </AppHeader>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default Head;
