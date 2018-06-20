import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './App.css';
import * as api from './api';

const CONTAINER_ID = 'map';

const buildMap = () => {
  let mymap = L.map(CONTAINER_ID).setView([60.168, 24.925], 15);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      stationsDigitransit: [],
      stationsCitybik: [],
    }
  }

  componentDidMount() {
    // buildMap();

    api.fetchDigitransit().then(stations =>
      this.setState({
        stationsDigitransit: stations,
      })
    );

    api.fetchCitybik().then(stations =>
      this.setState({
        stationsCitybik: stations,
      })
    );
  }

  render() {
    return (
      <div>
        <h3>api.digitransit.fi</h3>
        <div>
          {this.state.stationsDigitransit.map(station =>
            <div key={station.id}>
              {station.name}: {station.bikesAvailable}
            </div>
          )}
        </div>
        <h3>api.citybik.es</h3>
        <div>
          {this.state.stationsCitybik.map(station =>
            <div key={station.id}>
              {station.name}: {station.bikesAvailable}
            </div>
          )}
        </div>
      </div>
    );

    // return (
    //     <div id="map" className="map"></div>
    // );
  }
}

export default App;