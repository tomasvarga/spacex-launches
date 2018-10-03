import React, { Component } from 'react';
import logo from './logo.svg';

import Head from './components/Head';
import CardListWithInfinityScroll from './components/CardListWithInfinityScroll';
import Controls from './components/Controls';
import Search from './components/Search';
import PrimaryButton from './components/PrimaryButton';

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
    this.setState(prevState => ({
      isPhotosView: !prevState.isPhotosView,
    }), () => {
      const { data, cachedData, isPhotosView } = this.state;
      if (isPhotosView) {
        this.setState({ cachedData: data, isPaginationActivated: true, data: [] });
        this.loadNewPage();
      } else {
        this.setState({ data: cachedData, isPaginationActivated: false, actualPage: 0 });
      }
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

  calculatePages = (totals) => {
    const { totalPages, totalPagesPerPage } = totals;
    return Math.ceil(totalPages / totalPagesPerPage);
  }

  updatePages = (actualPage, maxPages) => {
    if (actualPage === maxPages) {
      this.setState({ isPaginationActivated: false });
    }
    return (actualPage <= maxPages) ? (actualPage + 1) : (maxPages + 1);
  }

  updateResults = results => prevState => ({
    data: [...prevState.data, ...results.data],
    actualPage: results.page,
    maxPages: results.maxPages,
    isLoading: false,
  })

  async loadNewPage() {
    this.setState({ isError: false, isLoading: true });
    const { requiredItemsPerPage, actualPage, maxPages } = this.state;
    const nextPage = this.updatePages(actualPage, maxPages);
    if (nextPage > maxPages) {
      this.setState({ isLoading: false });
      return null;
    }
    try {
      const result = await fetch(`${photoCollectionUrl}&per_page=${requiredItemsPerPage}&page=${nextPage}`);
      const photos = await result.json();
      const header = await result.headers;
      const totals = await { totalPagesPerPage: header.get('X-Per-Page'), totalPages: header.get('X-Total') };
      const newPages = this.calculatePages(totals);
      const newData = photos.map(photo => (this.transformPhoto(photo)));
      const results = { data: newData, page: nextPage, maxPages: newPages };
      this.setState(this.updateResults(results));
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
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
          <PrimaryButton type="button" onClick={() => this.handleCollectionClick()}>
            <span>SpacePhotos View</span>
            { isPhotosView ? 'ON' : 'OFF' }
          </PrimaryButton>
        </Controls>
        <CardListWithInfinityScroll
          data={data}
          searchTerm={searchTerm}
          isLoading={isLoading}
          isError={isError}
          isPhotosView={isPhotosView}
          isPaginationActivated={isPaginationActivated}
          isListView={isListView}
          onToNextPage={() => (isPhotosView ? this.loadNewPage() : {})}
        />
      </div>
    );
  }
}

export default App;
