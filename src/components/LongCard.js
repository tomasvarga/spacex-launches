import React from 'react';
import PropTypes from 'prop-types';
import CardContainer from './CardContainer';
import Info from './Info';
import Social from './Social';
import Title from './Title';
import Basic from './Basic';

const LongCard = ({
  title, subtitle, img, info, social,
}) => {
  const keys = Object.keys(social);
  const values = Object.values(social);
  return (
    <CardContainer>
      <Basic>
        <Title>{title}</Title>
        <img src={img} height="44" width="44" alt={title} />
        <span>{subtitle}</span>
      </Basic>
      <Info>{info || 'No additional info.'}</Info>
      <Social>
        { keys.map((link, index) => <a key={link} href={values[index]}>{link}</a>)}
      </Social>
    </CardContainer>
  );
};

LongCard.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  info: PropTypes.string,
  social: PropTypes.object,
};

export default LongCard;
