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

export type ApiResponse = {
  "data": {
    "vehicleRentalStations": VehicleRentalStation[];
  };
};
