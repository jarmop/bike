import response from "./response.json" with { type: "json" };

const stationsQuery = {
  query: `
{
  vehicleRentalStations {
    stationId
    name
    lat
    lon
    capacity
    operative
    availableVehicles {
      byType {
        count
        vehicleType {
          formFactor
        }
      }
    }
    availableSpaces {
      byType {
        count
        vehicleType {
          formFactor
        }
      }
    }
  }
}
`,
};

export type ByType = {
  "count": number;
  "vehicleType": {
    "formFactor": "BICYCLE";
  };
};

type VehicleRentalStation = {
  "stationId": string;
  "name": string;
  "lat": number;
  "lon": number;
  "capacity": number;
  "operative": boolean;
  "availableVehicles": {
    "byType": ByType[];
  };
  "availableSpaces": {
    "byType": ByType[];
  };
};

type Response = {
  "data": {
    "vehicleRentalStations": VehicleRentalStation[];
  };
};

export async function queryStations(
  skipCache = false,
): Promise<Response | undefined> {
  const cachedStations = localStorage.getItem("stations");
  if (cachedStations && !skipCache) {
    console.log("stations returned from cache");
    return JSON.parse(cachedStations);
  }

  const apiKey = localStorage.getItem("apikey");
  if (!apiKey) {
    console.log("apikey not found");
    return;
  }

  console.log("fetch stations from api");

  const url =
    `https://api.digitransit.fi/routing/v2/hsl/gtfs/v1?digitransit-subscription-key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stationsQuery),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: Response = await response.json();

    localStorage.setItem("stations", JSON.stringify(json));

    return json;
  } catch (error) {
    console.error(error);
  }
}

export function getStations() {
  return response;
}
