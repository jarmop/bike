const URL_DIGITRANSIT = 'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';

const STATION_IDS = ['021', '023', '030'];

type Station = {
  id: string,
  name: string,
  bikesAvailable: int,
};

export const fetchFavoriteStations = () => {
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