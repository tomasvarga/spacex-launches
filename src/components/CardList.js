import React from 'react';
import PropTypes from 'prop-types';
import LongCard from './LongCard';
import PhotoCard from './PhotoCard';
import List from './List';

const dataFilter = (data, searchTerm) => (
  data.filter(value => value.title.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
);

const CardList = ({ searchTerm, data, isListView }) => {
  const newData = searchTerm ? dataFilter(data, searchTerm) : data;
  return (
    <List style={{ flexDirection: isListView ? 'column' : 'row' }}>
      {newData.map(value => (isListView ? (
        <LongCard
          key={value.id}
          title={value.title}
          img={value.img}
          subtitle={value.subtitle}
          social={value.social}
          info={value.info}
        />
      ) : (
        <PhotoCard
          key={value.id}
          title={value.title}
          img={value.img}
        />
      )))}
    </List>
  );
};

CardList.propTypes = {
  searchTerm: PropTypes.string,
  data: PropTypes.instanceOf(Array).isRequired,
  isListView: PropTypes.bool.isRequired,
};

CardList.defaultProps = {
  searchTerm: '',
};


export default CardList;
