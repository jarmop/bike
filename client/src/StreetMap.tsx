import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { TileLayer } from "react-leaflet/TileLayer";
import { useStations } from "./useStations.tsx";
// import { useMap } from "react-leaflet/hooks";

export function StreetMap() {
  const [stations] = useStations();

  return (
    <MapContainer
      center={[60.1699, 24.9384]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.slice(0, 50).map((s) => (
        <Marker key={s.name} position={[s.lat, s.lon]}>
          <Popup>
            {s.name}
            <br />
            {s.count} bikes
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
