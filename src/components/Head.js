import React from 'react';
import PropTypes from 'prop-types';

const Head = ({ title, imgSrc }) => (
  <header className="App-header">
    <img src={imgSrc} height="100" width="100" alt="logo" />
    <h1 className="App-title">{title}</h1>
  </header>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default Head;
