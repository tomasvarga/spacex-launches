import React from 'react';
import PropTypes from 'prop-types';
import LongCard from './LongCard';
import PhotoCard from './PhotoCard';
import List from './List';
import Pagination from './Pagination';
import Loading from './Loading';
import Error from './Error';

const dataFilter = (data, searchTerm) => (
  data.filter(value => value.title.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
);

const CardList = ({
  searchTerm, data, isListView, isPaginationActivated, onToNextPage, isLoading, isError,
}) => {
  const newData = searchTerm ? dataFilter(data, searchTerm) : data;
  return (
    <div>
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
      <Loading isLoading={isLoading} />
      <Error isError={isError} />
      <Pagination isPaginationActivated={isPaginationActivated} onToNextPage={onToNextPage} />
    </div>
  );
};

CardList.propTypes = {
  searchTerm: PropTypes.string,
  data: PropTypes.instanceOf(Array).isRequired,
  isListView: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isPaginationActivated: PropTypes.bool.isRequired,
  onToNextPage: PropTypes.func,
};

CardList.defaultProps = {
  searchTerm: '',
  onToNextPage: () => { },
};

export default CardList;
