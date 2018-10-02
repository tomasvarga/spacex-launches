import React from 'react';
import PropTypes from 'prop-types';
import CardContainer from './CardContainer';
import Title from './Title';
import Basic from './Basic';

const PhotoCard = ({ title, img }) => (
  <CardContainer style={{
    width: '100px', height: '130px', marginLeft: '25px', background: `url('${img}') no-repeat center center`,
  }}
  >
    <Basic style={{ textAlign: 'center', margin: '0px', width: '100%' }}>
      <Title style={{ color: '#FFF', fontSize: '1.4em' }}>{title}</Title>
    </Basic>
  </CardContainer>
);

PhotoCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default PhotoCard;
