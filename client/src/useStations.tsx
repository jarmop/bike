import { useEffect, useState } from "react";
import { queryStations } from "./api.ts";
import { ByType } from "./types.ts";

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

const fetchData = async (skipCache = false) => {
  const stations = await queryStations(skipCache);
  if (!stations) {
    return [];
  }

  const relevantData: Station[] = [];
  stations.data.vehicleRentalStations.forEach((s) => {
    if (
      s.operative &&
      !s.stationId.includes("vantaa")
    ) {
      const available = countFromByTypes(s.availableVehicles.byType) || 0;
      relevantData.push({
        name: s.name,
        lat: s.lat,
        lon: s.lon,
        bikes: available,
        freeSpaces: Math.max(s.capacity - available, 0),
        capacity: s.capacity,
      });
    }
  });

  relevantData.sort((a, b) => b.bikes - a.bikes);

  return relevantData || [];
};

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);

  function refreshStations() {
    fetchData(true).then((stations) => setStations(stations));
  }

  useEffect(() => {
    fetchData().then((stations) => setStations(stations));
  }, []);

  return [stations, refreshStations] as const;
}
