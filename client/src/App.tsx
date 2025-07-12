import "./App.css";
import { StreetMap } from "./StreetMap.tsx";
import { useStations } from "./useStations.tsx";
import * as storage from "./storage.ts";
import { useState } from "react";

function App() {
  const [stations, refreshStations] = useStations();
  const [apikeyInput, setApikeyInput] = useState(storage.getApikey() || "");
  const apikeySaved = !!storage.getApikey();

  if (!apikeySaved || stations.length === 0) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        <label>Key:</label>{" "}
        <input
          value={apikeyInput}
          onChange={(e) => setApikeyInput(e.target.value)}
          style={{ width: "200px" }}
        />{" "}
        <button
          type="button"
          onClick={() => {
            storage.setApiKey(apikeyInput);
            refreshStations();
          }}
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <>
      <Refresh refreshStations={refreshStations} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <StreetMap stations={stations} />
      </div>
    </>
  );
}

function Refresh({ refreshStations }: { refreshStations: () => void }) {
  const timestamp = storage.getApiResponseTimestamp();

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "2",
        right: 0,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        border: "2px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <button
        type="button"
        style={{
          cursor: "pointer",
          borderRadius: "unset",
          border: "none",
          fontSize: "15px",
        }}
        onClick={refreshStations}
      >
        Refresh
      </button>
      {timestamp &&
        (
          <span
            style={{
              fontSize: "12px",
              background: "rgba(255,255,255,0.9)",
              padding: "2px 4px",
              textAlign: "center",
              borderTop: "1px solid #ccc",
              fontFamily: "monospace",
            }}
            title={new Date(timestamp).toLocaleDateString("de")}
          >
            {new Date(timestamp).toLocaleTimeString("es")}
          </span>
        )}
    </div>
  );
}

export default App;
