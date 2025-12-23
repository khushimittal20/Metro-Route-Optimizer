import axios from "axios";

const API_BASE = "http://localhost:5000/api/metro";

export const fetchStations = () => {
  return axios.get(`${API_BASE}/stations`);
};

export const fetchRoute = (sourceId, destinationId) => {
  return axios.get(
    `${API_BASE}/route?sourceId=${sourceId}&destinationId=${destinationId}`
  );
};
