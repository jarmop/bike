import { useEffect, useState } from "react";
import { queryStations } from "./api.ts";
import "./App.css";

type Data = {
  name: string;
  count: number;
};

const favorites = [
  "Trumpettikuja",
  "Kannelmäen asema",
  "Kannelmäen liikuntapuisto",
  "Huopalahden asema",
  "Paloheinän maja",
];

export function Stations() {
  const [data, setData] = useState<Data[]>();

  const fetchData = async (skipCache = false) => {
    const stations = await queryStations(skipCache);
    if (!stations) {
      return;
    }

    const relevantData = stations.data.vehicleRentalStations.filter((s) => {
      const byType = s.availableVehicles.byType;
      return !s.stationId.includes("vantaa") && byType.length === 1 &&
        byType[0].vehicleType.formFactor === "BICYCLE";
    }).map((s) => {
      return {
        name: s.name,
        count: s.availableVehicles.byType[0].count,
      };
    }).sort((a, b) => b.count - a.count);

    setData(relevantData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button type="button" onClick={() => fetchData(true)}>
        Refresh data
      </button>
      <div style={{ display: "flex" }}>
        <div
          style={{
            paddingRight: "20px",
            marginRight: "20px",
            // borderRight: "1px solid black",
          }}
        >
          <h2>Favorites</h2>
          <table>
            <tbody>
              {data?.filter((d) => favorites.includes(d.name)).map((d) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td>{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>All</h2>
          <table>
            <tbody>
              {data?.map((d) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td>{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
