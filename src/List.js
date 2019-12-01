import React, {Component} from 'react';

import * as api from './api';

class List extends Component {
  constructor() {
    super();

    this.state = {
      stations: [],
    };
  }

  componentDidMount() {
    api.fetchStations().then(stations =>
        this.setState({
          stations: stations.filter(
              station => this.props.favoriteStations.includes(station.id)
          ),
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