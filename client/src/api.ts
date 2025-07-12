import response from "./response.json" with { type: "json" };
import * as storage from "./storage.ts";
import { ApiResponse } from "./types.ts";

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

export async function queryStations(
  skipCache = false,
): Promise<ApiResponse | undefined> {
  const cachedApiResponse = storage.getApiResponse();
  if (cachedApiResponse && !skipCache) {
    console.log("stations returned from cache");
    return cachedApiResponse;
  }

  const apiKey = storage.getApikey();
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
    const json: ApiResponse = await response.json();

    storage.setApiResponse(json);

    return json;
  } catch (error) {
    console.error(error);
  }
}

export function getStations() {
  return response;
}
