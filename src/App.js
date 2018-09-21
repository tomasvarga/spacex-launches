import React, { Component } from 'react';
import logo from './logo.svg';

import Head from './components/Head';
import CardList from './components/CardList';
import Controls from './components/Controls';
import Search from './components/Search';
import PrimaryButton from './components/PrimaryButton';
import Loading from './components/Loading';
import Error from './components/Error';

const url = 'https://api.spacexdata.com/v2/launches/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isError: false,
      isListView: true,
      searchTerm: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({ isError: false, isLoading: true });
    try {
      const result = await fetch(url);
      const flights = await result.json();
      let newData = [];
      newData = flights.map(flight => (this.transformData(flight)));
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

  render() {
    const {
      data, isError, isListView, searchTerm, isLoading,
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
        </Controls>
        <Loading isLoading={isLoading} />
        <Error isError={isError} />
        <CardList data={data} searchTerm={searchTerm} isListView={isListView} />
      </div>
    );
  }
}

export default App;
