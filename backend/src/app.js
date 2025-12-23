const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  

// Import routes
const metroRoutes = require("./routes/metro.routes");

// Use routes
app.use("/api/metro", metroRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Metro Route Optimization Backend" });
});

module.exports = app;
// const routeRoutes = require("./routes/route.routes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// const metroRoutes = require("./routes/route.routes");
// app.use("/api/metro", routeRoutes);

// module.exports = app;
