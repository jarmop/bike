import React, { Component } from 'react';

import * as api from './api';

class List extends Component {
  constructor() {
    super();

    this.state = {
      stations: [],
    }
  }

  componentDidMount() {
    api.fetchFavoriteStations().then(stations =>
      this.setState({
        stations: stations,
      })
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.state.stations.map(station =>
            <div key={station.id}>
              {station.name}: {station.bikesAvailable}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default List;