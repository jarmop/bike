import { useEffect, useState } from "react";
import { queryStations } from "./api.ts";

type Stations = {
  name: string;
  lat: number;
  lon: number;
  count: number;
};

export function useStations() {
  const [stations, setStations] = useState<Stations[]>([]);

  const fetchData = async (skipCache = false) => {
    const stations = await queryStations(skipCache);
    if (!stations) {
      return;
    }

    const relevantData = stations.data.vehicleRentalStations.filter((s) => {
      const byType = s.availableVehicles.byType;
      return !s.stationId.includes("vantaa") && byType.length === 1 &&
        byType[0].vehicleType.formFactor === "BICYCLE";
    }).map((s) => {
      return {
        name: s.name,
        lat: s.lat,
        lon: s.lon,
        count: s.availableVehicles.byType[0].count,
      };
    }).sort((a, b) => b.count - a.count);

    setStations(relevantData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [stations, setStations] as const;
}
