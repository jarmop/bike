import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";
import { Station, useStations } from "./useStations.tsx";
import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const center: LatLngTuple = [60.1699, 24.9384];

export function StreetMap() {
  const [stations] = useStations();
  const maxCount = stations[0]?.count || 0;

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

  const colorIntensity = 225;
  let fillColor = `rgb(0,0,${colorIntensity}`;
  let textColor = "#eee";
  if (station.count < 3) {
    fillColor = `rgb(${colorIntensity},${colorIntensity},${colorIntensity})`;
    textColor = "#333";
  } else if (station.count < 10) {
    fillColor = `rgb(${colorIntensity},${colorIntensity},0)`;
    textColor = "#333";
  } else if (station.count < 30) {
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
          {station.name} <br /> {station.count} bikes
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
            x={station.count > 9 ? -5 : -3}
            y="2.8"
            stroke={textColor}
            fontSize="10px"
            fontFamily="ariel"
          >
            {station.count}
          </text>
        </g>
      </SVGOverlay>
    </>
  );
}

function MarkerStation({ station }: { station: Station }) {
  return (
    <Marker key={station.name} position={[station.lat, station.lon]}>
      <Popup>
        {station.name}
        <br />
        {station.count} bikes
      </Popup>
    </Marker>
  );
}
