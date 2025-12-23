const stations = require("../models/stations.model");
const connections = require("../models/connections.model");

// Build adjacency list from connections
const buildGraph = () => {
  const graph = {};

  stations.forEach(station => {
    graph[station.id] = [];
  });

  connections.forEach(conn => {
    // Directed graph: from -> to
    graph[conn.from].push({ to: conn.to, time: conn.time, line: conn.line });
    // Optional: if metro is bidirectional
    graph[conn.to].push({ to: conn.from, time: conn.time, line: conn.line });
  });

  return graph;
};

// Dijkstra function
const dijkstra = (startId, endId, interchangePenalty = 5) => {
  const graph = buildGraph();
  const distances = {};
  const previous = {};
  const prevLine = {};
  const visited = new Set();

  // Initialize distances
  stations.forEach(s => {
    distances[s.id] = Infinity;
    previous[s.id] = null;
    prevLine[s.id] = null;
  });
  distances[startId] = 0;

  while (visited.size < stations.length) {
    // Pick unvisited node with smallest distance
    let currNode = null;
    let minDist = Infinity;

    for (let node in distances) {
      if (!visited.has(Number(node)) && distances[node] < minDist) {
        minDist = distances[node];
        currNode = Number(node);
      }
    }

    if (currNode === null) break; // Remaining nodes are unreachable
    if (currNode === endId) break; // Reached destination

    visited.add(currNode);

    // Update neighbors
    graph[currNode].forEach(neighbor => {
      if (!visited.has(neighbor.to)) {
        let extra = 0;
        if (prevLine[currNode] && prevLine[currNode] !== neighbor.line) {
          extra = interchangePenalty;
        }
        const alt = distances[currNode] + neighbor.time + extra;
        if (alt < distances[neighbor.to]) {
          distances[neighbor.to] = alt;
          previous[neighbor.to] = currNode;
          prevLine[neighbor.to] = neighbor.line;
        }
      }
    });
  }

  // Reconstruct path
  const path = [];
  const lines = [];
  let curr = endId;
  if (previous[curr] !== null || curr === startId) {
    while (curr !== null) {
      path.unshift(curr);
      lines.unshift(prevLine[curr] || null);
      curr = previous[curr];
    }
  }
  if (lines.length > 0) lines[0] = null;

  return {
    totalTime: distances[endId],
    path: path,
    lines: lines
  };
};

module.exports = { dijkstra };
