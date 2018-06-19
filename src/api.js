const URL = 'https://api.citybik.es/v2/networks/citybikes-helsinki';

const STATION_IDS = ['021', '023', '030'];

export const fetchData = () => {
  return fetch(URL).then(resposnse => resposnse.json()).then(json => {
    return json.network.stations.filter(station => STATION_IDS.includes(station.extra.uid));
  });
};