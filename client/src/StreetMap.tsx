import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";
import { Station } from "./useStations.tsx";
import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const center: LatLngTuple = [60.1699, 24.9384];

export function StreetMap({ stations }: { stations: Station[] }) {
  const maxCount = stations[0]?.bikes || 0;

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.toReversed().map((s) => (
        // <MarkerStation key={s.name} station={s} />
        <SVGStation key={s.name} station={s} maxCount={maxCount} />
      ))}
    </MapContainer>
  );
}

function SVGStation({ station }: { station: Station; maxCount: number }) {
  const stationCenter: LatLngTuple = [station.lat, station.lon];
  const svgBounds: LatLngBoundsLiteral = [
    [stationCenter[0] - 0.005, stationCenter[1] - 0.01],
    [stationCenter[0] + 0.005, stationCenter[1] + 0.01],
  ];
  const radius = 10;
  const bikesOffRack = station.bikes + station.freeSpaces - station.capacity;

  const colorIntensity = 225;
  let fillColor = `rgb(0,0,${colorIntensity}`;
  let textColor = "#eee";
  if (station.freeSpaces === 0) {
    fillColor = `rgb(${colorIntensity},0,0`;
    textColor = "#eee";
  } else if (station.bikes < 5) {
    fillColor = `rgb(${colorIntensity},${colorIntensity},${colorIntensity})`;
    textColor = "#333";
  } else if (station.bikes < 10) {
    fillColor = `rgb(${colorIntensity},${colorIntensity},0)`;
    textColor = "#333";
  } else if (station.bikes < 20) {
    fillColor = `rgb(0,${colorIntensity},${colorIntensity})`;
    textColor = "#333";
  }

  return (
    <>
      <CircleMarker
        center={stationCenter}
        pathOptions={{ fillColor: "red" }}
        radius={radius}
      >
        <Popup>
          {station.name} <br /> {station.capacity - station.freeSpaces} /{" "}
          {station.capacity} {bikesOffRack ? `(+ ${bikesOffRack})` : ""}
        </Popup>
      </CircleMarker>
      <SVGOverlay
        attributes={{ stroke: "black" }}
        bounds={svgBounds}
      >
        <g
          style={{ transform: "translate(50%, 50%)" }}
        >
          <circle
            r={radius}
            cx="0"
            cy="0"
            fill={fillColor}
          />
          <text
            x={station.bikes > 9 ? -5 : -3}
            y="2.8"
            stroke={textColor}
            fontSize="10px"
            fontFamily="ariel"
          >
            {station.bikes}
          </text>
        </g>
      </SVGOverlay>
    </>
  );
}
