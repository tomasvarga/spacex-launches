import React, { Component } from 'react';
import logo from './logo.svg';

import Head from './components/Head';
import CardList from './components/CardList';
import Controls from './components/Controls';
import Search from './components/Search';
import PrimaryButton from './components/PrimaryButton';
import Loading from './components/Loading';
import Error from './components/Error';

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
      searchTerm: '',
      isLoading: true,
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
    }));
    const { data, cachedData, isPhotosView } = this.state;
    // redo to bi-transfer <-> data and cachedData
    if (!isPhotosView) {
      this.setState({ cachedData: data });
    } else {
      this.setState({ data: cachedData });
    }
    this.loadPhotosView();
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
    p.title = photo.description;
    p.img = photo.urls.small;
    p.social = photo.links;
    return p;
  }

  async loadPhotosView() {
    this.setState({ isError: false, isLoading: true });
    try {
      const result = await fetch(photoCollectionUrl);
      const photos = await result.json();
      console.log(photos);
      const newData = photos.map(photo => (this.transformPhoto(photo)));
      this.setState({ data: newData, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const {
      data, isError, isListView, searchTerm, isLoading, isPhotosView,
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
          <PrimaryButton type="button" onClick={() => this.handleCollectionClick()}>
            <span>SpacePhotos View </span>
            { isPhotosView ? 'ON' : 'OFF' }
          </PrimaryButton>
        </Controls>
        <Loading isLoading={isLoading} />
        <Error isError={isError} />
        <CardList data={data} searchTerm={searchTerm} isPhotosView={isPhotosView} isListView={isListView} />
      </div>
    );
  }
}

export default App;
