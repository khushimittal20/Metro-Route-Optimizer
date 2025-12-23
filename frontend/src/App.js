import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [stations, setStations] = useState([]);
  const [sourceId, setSourceId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '');
  console.log("API_URL:", API_URL);

  // Fetch all stations on component mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/metro/stations`);
        setStations(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stations");
      }
    };
    fetchStations();
  }, [API_URL]);

  const getRoute = async () => {
    if (!sourceId || !destinationId) {
      setError("Please select both source and destination");
      return;
    }

    setLoading(true);
    setError("");
    setRoute(null);

    try {
      const res = await axios.get(
        `${API_URL}/api/metro/route?sourceId=${sourceId}&destinationId=${destinationId}`
      );
      setRoute(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="app">
    <h1>🚇 Metro Route Optimizer</h1>

    <div className="form-group">
      <label>Source Station</label>
      <select value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
        <option value="">Select Source</option>
        {stations.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>Destination Station</label>
      <select
        value={destinationId}
        onChange={(e) => setDestinationId(e.target.value)}
      >
        <option value="">Select Destination</option>
        {stations.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>

    <button onClick={getRoute} disabled={loading}>
      {loading ? "Calculating Route..." : "Get Route"}
    </button>

    {error && <p className="error">{error}</p>}

    {route && (
      <div className="route-box">
        <h2>Total Time: {route.totalTime} mins</h2>
        <ul className="route-list">
          {route.route.map((stop, index) => (
            <li key={index} className="route-item">
              <div className="dot"></div>
              <span className="station">{stop.station}</span>
              {stop.line && (
                <span className={`line-badge ${stop.line.toLowerCase()}`}>
                  {stop.line}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
}

export default App;
