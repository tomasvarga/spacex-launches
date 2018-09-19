import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import Head from './components/Head';
import CardList from './components/CardList';
import Controls from './components/Controls';
import Search from './components/Search';
import PrimaryButton from './components/PrimaryButton';

const url = 'https://api.spacexdata.com/v2/launches/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      listView: true,
      searchTerm: '',
    };
  }

  async componentDidMount() {
    try {
      const result = await fetch(url);
      const flights = await result.json();
      const newData = [];
      flights.map(flight => newData.push(this.transformData(flight)));
      this.setState({ data: newData.reverse() });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      listView: !prevState.listView,
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
      data, error, listView, searchTerm,
    } = this.state;
    return (
      <div className="App">
        <Head title="SpaceX launches" imgSrc={logo} />
        {error && <div>{error}</div>}
        <Controls>
          <Search type="text" placeholder="Search" onChange={e => this.changeText(e)} />
          <PrimaryButton type="button" onClick={() => this.handleClick()}>
            <span>Switch to </span>
            {listView ? 'IconView' : 'ListView'}
          </PrimaryButton>
        </Controls>
        {data && <CardList data={data} searchTerm={searchTerm} listView={listView} />}
      </div>
    );
  }
}

export default App;
