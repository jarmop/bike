import { Station } from "./useStations.tsx";

export const APIKEY = "apikey";
export const STATIONS = "stations";
type KEY = "apikey" | "stations";

export function getData(key: KEY) {
  return localStorage.getItem(key);
}

export function setData(key: KEY, data: string) {
  localStorage.setItem(key, data);
}

export function getStations() {
  const stations = getData("stations");
  return stations ? JSON.parse(stations) as Station[] : [];
}
