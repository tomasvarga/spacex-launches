import React, { Component } from 'react';
import logo from './logo.svg';

import Head from './components/Head';
import CardListFetchWithScroll from './components/CardListFetchWithScroll';
import Controls from './components/Controls';
import Search from './components/Search';
import PrimaryButton from './components/PrimaryButton';
import backend from './backend';

const mainDataUrl = 'https://api.spacexdata.com/v2/launches/';
const accessKey = '048e18203982e5ba8e39d8cac99b504a240bdb7aa3561de136a36d2b52e2f835';
const photoCollectionUrl = `https://api.unsplash.com/collections/1111575/photos/?client_id=${accessKey}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cachedData: [],
      isError: false,
      isListView: true,
      isPhotosView: false,
      isPaginationActivated: false,
      isLoading: true,
      searchTerm: '',
      requiredItemsPerPage: 28,
      actualPage: 0,
      maxPages: 1,
    };
  }

  async componentDidMount() {
    this.setState({ isError: false, isLoading: true });
    try {
      const result = await fetch(mainDataUrl);
      const flights = await result.json();
      const newData = flights.map(flight => (this.transformData(flight)));
      this.setState({ data: newData.reverse(), isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      isListView: !prevState.isListView,
    }));
  }

  handleCollectionClick = () => {
    this.setState((prevState) => {
      const isPhotosView = !prevState.isPhotosView;
      const { cachedData, data } = this.state;
      if (isPhotosView) {
        return {
          isPhotosView, cachedData: data, isPaginationActivated: true, data: [],
        };
      }
      return {
        isPhotosView, data: cachedData, isPaginationActivated: false, actualPage: 0,
      };
    });
  }

  changeText = (event) => {
    const searchText = event.target.value;
    this.setState({ searchTerm: searchText });
  }

  transformData = (flight) => {
    const d = {};
    d.id = flight.flight_number;
    d.title = flight.mission_name;
    d.img = flight.links.mission_patch_small;
    d.subtitle = flight.rocket.rocket_name;
    d.info = flight.details;
    d.social = flight.links;
    return d;
  }

  transformPhoto = (photo) => {
    const p = {};
    p.id = photo.id;
    p.title = (photo.description === null) ? '' : photo.description;
    p.img = photo.urls.small;
    p.social = photo.links;
    p.subtitle = '';
    p.info = '';
    return p;
  }

  getNextPage = (actualPage, maxPages) => ((actualPage <= maxPages) && (actualPage + 1));

  updateResults = results => prevState => ({
    data: [...prevState.data, ...results.data],
    actualPage: results.actualPage,
    maxPages: results.maxPages,
    isLoading: false,
  })

  async loadNewPage() {
    this.setState({ isError: false, isLoading: true });
    const { requiredItemsPerPage, actualPage, maxPages } = this.state;
    const nextPage = this.getNextPage(actualPage, maxPages);
    if (nextPage > maxPages) {
      this.setState({ isPaginationActivated: false, isLoading: false });
      return false;
    }
    try {
      const fetchUrlWithHeaders = {
        url: `${photoCollectionUrl}&per_page=${requiredItemsPerPage}&page=${nextPage}`,
        headers: { page: 'X-Per-Page', total: 'X-Total' },
      };
      const result = await backend(fetchUrlWithHeaders);
      const { totalPages, totalPagesPerPage } = result.totals;
      const newPagesCount = Math.ceil(totalPages / totalPagesPerPage);
      const newData = result.data.map(photo => (this.transformPhoto(photo)));
      const results = { data: newData, actualPage: nextPage, maxPages: newPagesCount };
      this.setState(this.updateResults(results));
      return null;
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
      return null;
    }
  }

  render() {
    const {
      data, isError, isListView, searchTerm, isLoading, isPhotosView, isPaginationActivated,
    } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <Head title="SpaceX launches" imgSrc={logo} />
        <Controls>
          <Search type="text" placeholder="Search" onChange={e => this.changeText(e)} />
          <PrimaryButton type="button" onClick={() => this.handleClick()}>
            <span>Switch to </span>
            {isListView ? 'IconView' : 'ListView'}
          </PrimaryButton>
          <span style={{ marginTop: '20px' }}> SpacePhotos with Pagination </span>
          <PrimaryButton type="button" onClick={this.handleCollectionClick}>
            <span>SpacePhotos View</span>
            { isPhotosView ? 'ON' : 'OFF' }
          </PrimaryButton>
        </Controls>
        <CardListFetchWithScroll
          data={data}
          searchTerm={searchTerm}
          isLoading={isLoading}
          isError={isError}
          isPhotosView={isPhotosView}
          isPaginationActivated={isPaginationActivated}
          isListView={isListView}
          onToNextPage={() => (isPaginationActivated ? this.loadNewPage() : {})}
        />
      </div>
    );
  }
}

export default App;
