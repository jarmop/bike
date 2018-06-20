const URL_CITYBIK = 'https://api.citybik.es/v2/networks/citybikes-helsinki';
const URL_DIGITRANSIT = 'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';

const STATION_IDS = ['021', '023', '030'];

type Station = {
  id: string,
  name: string,
  bikesAvailable: int,
};

export const fetchDigitransit = () => {
  return fetch(URL_DIGITRANSIT).then(res => res.json()).then(json => {
    let stations: Array<Station> = json.stations
      .filter(station => STATION_IDS.includes(station.id))
      .map(station => ({
        id: station.id,
        name: station.name,
        bikesAvailable: station.bikesAvailable,
      }));

    return stations;
  });
};

export const fetchCitybik = () => {
  return fetch(URL_CITYBIK).then(response => response.json()).then(json => {

    let stations: Array<Station> = json.network.stations
      .filter(station => STATION_IDS.includes(station.extra.uid))
      .map(station => ({
        id: station.extra.uid,
        name: station.name,
        bikesAvailable: station.free_bikes,
      }));

    return stations;
  });
};