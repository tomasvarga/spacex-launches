import React from 'react';
import PropTypes from 'prop-types';
import LongCard from './LongCard';
import Card from './Card';
import List from './List';

const dataFilter = (data, searchTerm) => {
  return data.filter(value => value.title.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

const CardList = ({ searchTerm, data, listView }) => {
  const newData = searchTerm ? dataFilter(data, searchTerm) : data;
  return (
    <List style={{ flexDirection: listView ? 'column' : 'row' }}>
      {newData.map(value => (listView ? (
        <LongCard
          key={value.id}
          title={value.title}
          img={value.img}
          subtitle={value.subtitle}
          social={value.social}
          info={value.info}
        />
      ) : (
        <Card
          key={value.id}
          title={value.title}
          img={value.img}
          subtitle={value.subtitle}
        />
      )))}
    </List>
  );
};

CardList.propTypes = {
  searchTerm: PropTypes.string,
  data: PropTypes.instanceOf(Array).isRequired,
  listView: PropTypes.bool.isRequired,
};

export default CardList;
