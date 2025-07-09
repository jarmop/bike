import "./App.css";
import { StreetMap } from "./StreetMap.tsx";
import { useStations } from "./useStations.tsx";
import { getData, setData } from "./storage.ts";
import { useState } from "react";

function App() {
  const [stations, refreshStations] = useStations();
  const [apikeyInput, setApikeyInput] = useState(getData("apikey") || "");
  const apikeySaved = !!getData("apikey");

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
            setData("apikey", apikeyInput);
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
