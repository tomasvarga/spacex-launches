import { compose } from 'recompose';
import CardList from './CardList';

import withInfinityScroll from './hoc/withInfinityScroll';
import fetchDataAfterMount from './hoc/fetchDataAfterMount';

const CardListFetchWithScroll = compose(
  withInfinityScroll,
  fetchDataAfterMount,
)(CardList);

export default CardListFetchWithScroll;
