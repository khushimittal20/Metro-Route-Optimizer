import React, { useState, useEffect } from "react";
import axios from "axios";

const RouteForm = ({ onRouteFetched }) => {
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  // Fetch all stations on mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/metro/stations");
        setStations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !destination) return alert("Select source and destination!");

    try {
      const res = await axios.get("http://localhost:5000/api/metro/route", {
        params: { sourceId: source, destinationId: destination },
      });
      onRouteFetched(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching route");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Source:
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select source</option>
          {stations.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </label>
      <label>
        Destination:
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select destination</option>
          {stations.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Get Route</button>
    </form>
  );
};

export default RouteForm;
