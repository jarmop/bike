import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './Map.css';

import * as api from './api';

const CONTAINER_ID = 'map';
const BIKE_STATION_DIAMETER = 18;
const HOME_LATITUDE = 60.240187;
const HOME_LONGITUDE = 24.8722;
const HOME_COORDINATES = [HOME_LATITUDE, HOME_LONGITUDE];
const ZOOM = 14;

const buildMap = (stations) => {
  let map = L.map(CONTAINER_ID);

  map.on('locationerror', (errorEvent) => {
    map.setView(HOME_COORDINATES, ZOOM);
    console.error(errorEvent.message);
  });

  map.on('locationfound', (locationEvent) => {
    map.setView(locationEvent.latlng, ZOOM);
  });

  map.locate();

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      attribution:
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      tileSize: 512,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
    }
  ).addTo(map);

  stations.forEach((station) => {
    let classNames = ['bike-station'];

    if (!station.isOn) {
      classNames.push('bike-station--off');
    } else if (station.bikesAvailable === 0) {
      classNames.push('bike-station--empty');
    } else if (station.bikesAvailable < 4) {
      classNames.push('bike-station--low');
    }

    let divIcon = L.divIcon({
      html: station.bikesAvailable,
      className: classNames.join(' '),
      iconSize: [BIKE_STATION_DIAMETER, BIKE_STATION_DIAMETER],
    });
    L.marker([station.lon, station.lat], { icon: divIcon }).addTo(map);
  });
};

class Map extends Component {
  componentDidMount() {
    api.fetchStations().then((stations) => buildMap(stations));
  }

  render() {
    return <div id="map" className="map"></div>;
  }
}

export default Map;
