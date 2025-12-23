// algorithms/dijkstraDb.js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p].dist <= this.heap[i].dist) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  bubbleDown() {
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      let smallest = i;

      if (l < n && this.heap[l].dist < this.heap[smallest].dist) smallest = l;
      if (r < n && this.heap[r].dist < this.heap[smallest].dist) smallest = r;
      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function dijkstra(graph, startNodes, endStationId) {
  const dist = {};
  const prev = {};
  const heap = new MinHeap();

  for (const start of startNodes) {
    dist[start] = 0;
    heap.push({ node: start, dist: 0 });
  }

  while (!heap.isEmpty()) {
    const { node, dist: d } = heap.pop();
    if (d > dist[node]) continue;

    const [stationId] = node.split("|");
    if (stationId === endStationId) {
      return { dist, prev, endNode: node };
    }

    for (const edge of graph[node] || []) {
      const nd = d + edge.weight;
      if (dist[edge.to] === undefined || nd < dist[edge.to]) {
        dist[edge.to] = nd;
        prev[edge.to] = node;
        heap.push({ node: edge.to, dist: nd });
      }
    }
  }

  return null;
}

module.exports = dijkstra;
