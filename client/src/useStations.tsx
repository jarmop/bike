import { useEffect, useState } from "react";
import { ByType, queryStations } from "./api.ts";

export type Station = {
  name: string;
  lat: number;
  lon: number;
  bikes: number;
  freeSpaces: number;
  capacity: number;
};

function countFromByTypes(
  byTypes: ByType[],
) {
  return byTypes.find((b) => b.vehicleType.formFactor === "BICYCLE")?.count;
}

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);

  const fetchData = async (skipCache = false) => {
    const stations = await queryStations(skipCache);
    if (!stations) {
      return;
    }

    const relevantData: Station[] = [];
    stations.data.vehicleRentalStations.forEach((s) => {
      const availableVehicles = countFromByTypes(s.availableVehicles.byType);
      const availableSpaces = countFromByTypes(s.availableSpaces.byType);
      if (
        s.operative &&
        !s.stationId.includes("vantaa") &&
        availableVehicles !== undefined && availableSpaces !== undefined
      ) {
        relevantData.push({
          name: s.name,
          lat: s.lat,
          lon: s.lon,
          bikes: availableVehicles,
          freeSpaces: availableSpaces,
          capacity: s.capacity,
        });
      }
    });

    relevantData.sort((a, b) => b.bikes - a.bikes);

    setStations(relevantData);
  };

  function refreshStations() {
    fetchData(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [stations, refreshStations] as const;
}
