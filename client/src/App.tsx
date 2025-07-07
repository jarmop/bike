import "./App.css";
import { StreetMap } from "./StreetMap.tsx";
import { useStations } from "./useStations.tsx";

function App() {
  const [stations, refreshStations] = useStations();

  return (
    <>
      <button
        type="button"
        style={{
          position: "absolute",
          zIndex: "2",
          right: 0,
          margin: "10px",
          cursor: "pointer",
        }}
        onClick={refreshStations}
      >
        Refresh
      </button>
      <div style={{ position: "relative", zIndex: 1 }}>
        <StreetMap stations={stations} />
      </div>
    </>
  );
}

export default App;
