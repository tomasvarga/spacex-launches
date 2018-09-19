import React from 'react';
import PropTypes from 'prop-types';
import CardContainer from './CardContainer';
import Title from './Title';
import Basic from './Basic';

const Card = ({ title, subtitle, img }) => (
  <CardContainer style={{ width: '100px', height: '130px', marginLeft: '25px' }}>
    <Basic style={{ margin: '0px auto' }}>
      <Title>{title}</Title>
      <img src={img} height="44" width="44" alt={title} />
      <span>{subtitle}</span>
    </Basic>
  </CardContainer>
);

Card.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Card;
