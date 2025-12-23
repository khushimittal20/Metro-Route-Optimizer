const Station = require("../models/Station");
const Connection = require("../models/Connection");
const getStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all connections
const getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({});
    res.status(200).json(connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getStations, getConnections };
