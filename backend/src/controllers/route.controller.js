const Station = require("../models/Station");
const Connection = require("../models/Connection");
const dijkstra = require("../algorithms/dijkstraDb");

const INTERCHANGE_PENALTY = 5;

exports.getRoute = async (req, res) => {
  try {
    const { sourceId, destinationId } = req.query;

    const stations = await Station.find();
    const connections = await Connection.find();

    const graph = {};
    const stationLines = {};

    // 1️⃣ Track which lines pass through each station
    connections.forEach(c => {
      stationLines[c.from] ??= new Set();
      stationLines[c.to] ??= new Set();
      stationLines[c.from].add(c.line);
      stationLines[c.to].add(c.line);
    });

    // 2️⃣ Create nodes
    for (const [stationId, lines] of Object.entries(stationLines)) {
      for (const line of lines) {
        graph[`${stationId}|${line}`] = [];
      }
    }

    // 3️⃣ Travel edges
    connections.forEach(c => {
      const from = `${c.from}|${c.line}`;
      const to = `${c.to}|${c.line}`;
      graph[from].push({ to, weight: c.time });
      graph[to].push({ to: from, weight: c.time });
    });

    // 4️⃣ Interchange edges
    for (const [stationId, lines] of Object.entries(stationLines)) {
      const arr = [...lines];
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          graph[`${stationId}|${arr[i]}`].push({
            to: `${stationId}|${arr[j]}`,
            weight: INTERCHANGE_PENALTY
          });
          graph[`${stationId}|${arr[j]}`].push({
            to: `${stationId}|${arr[i]}`,
            weight: INTERCHANGE_PENALTY
          });
        }
      }
    }

    // 5️⃣ Start nodes = all lines at source
    const startNodes = [...(stationLines[sourceId] || [])].map(
      l => `${sourceId}|${l}`
    );

    const result = dijkstra(graph, startNodes, destinationId);
    if (!result) return res.status(404).json({ error: "No route found" });

    // 6️⃣ Reconstruct path
    const path = [];
    let cur = result.endNode;

    while (cur) {
      path.push(cur);
      cur = result.prev[cur];
    }

    path.reverse();

    // 7️⃣ Build response
    const stationMap = {};
    stations.forEach(s => (stationMap[s._id] = s.name));

    const route = path.map((n, i) => {
      const [stationId, line] = n.split("|");
      const prev = path[i - 1];
      const interchange =
        prev && prev.split("|")[0] === stationId && prev.split("|")[1] !== line;

      return {
        station: stationMap[stationId],
        line,
        interchange: !!interchange
      };
    });

    res.json({
      totalTime: result.dist[result.endNode],
      route
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
