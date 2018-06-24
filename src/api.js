const URL_DIGITRANSIT = 'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';

const STATION_IDS = ['021', '023', '030'];

type Station = {
  id: string,
  name: string,
  bikesAvailable: int,
  lat: float,
  lon: float,
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
        }));

    return stations;
  });
};

export const fetchFavoriteStations = () => {
  return fetchStations().then(
      stations => stations.filter(station => STATION_IDS.includes(station.id))
  );
};