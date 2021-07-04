const URL_DIGITRANSIT =
  'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental';

const BIKE_NETWORK_ID = 'smoove';

const STATION_STATE_ON = 'Station on';
// const STATION_STATE_OFF = 'Station off';

type Station = {
  id: string;
  name: string;
  bikesAvailable: number;
  lat: number;
  lon: number;
  isOn: boolean;
};

const belongsToCorrectBikeNetwork = (stationData: any) =>
  stationData.networks.includes(BIKE_NETWORK_ID);

export const fetchStations = () => {
  return fetch(URL_DIGITRANSIT)
    .then((res) => res.json())
    .then((data) => {
      let stations: Array<Station> = data.stations
        .filter(belongsToCorrectBikeNetwork)
        .map((stationData: any) => ({
          id: stationData.id,
          name: stationData.name,
          bikesAvailable: stationData.bikesAvailable,
          lat: stationData.x,
          lon: stationData.y,
          isOn: stationData.state === STATION_STATE_ON,
        }));

      return stations;
    });
};
