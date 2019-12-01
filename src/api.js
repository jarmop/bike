const URL_DIGITRANSIT = 'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';

const STATION_STATE_ON = 'Station on';
// const STATION_STATE_OFF = 'Station off';

type Station = {
  id: string,
  name: string,
  bikesAvailable: int,
  lat: float,
  lon: float,
  isOn: boolean,
};

export const fetchStations = () => {
  return fetch(URL_DIGITRANSIT).then(res => res.json()).then(json => {
    let stations: Array<Station> = json.stations
        .map(station => ({
          id: station.id,
          name: station.name,
          bikesAvailable: station.bikesAvailable,
          lat: station.x,
          lon: station.y,
          isOn: station.state === STATION_STATE_ON,
        }));

    return stations;
  });
};