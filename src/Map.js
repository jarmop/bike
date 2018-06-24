import React, {Component} from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './Map.css';

import * as api from './api';

const CONTAINER_ID = 'map';
const BIKE_STATION_DIAMETER = 15;
const CENTER_LATITUDE = 24.925;
const CENTER_LONGITUDE = 60.168;

const buildMap = (stations) => {
  let map = L.map(CONTAINER_ID).setView([CENTER_LONGITUDE, CENTER_LATITUDE], 14);

  L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
      }
  ).addTo(map);

  stations.forEach(station => {
    console.log(station);

    let divIcon = L.divIcon({
      html: station.bikesAvailable,
      className: 'bike-station',
      iconSize: [BIKE_STATION_DIAMETER, BIKE_STATION_DIAMETER]
    });
    L.marker([station.lon, station.lat], {icon: divIcon}).addTo(map);
  });


};

class Map extends Component {
  componentDidMount() {
    api.fetchStations().then(stations => buildMap(stations));
  }

  render() {
    return (
        <div id="map" className="map"></div>
    );
  }
}

export default Map;