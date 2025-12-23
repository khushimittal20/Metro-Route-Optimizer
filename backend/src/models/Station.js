const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lines: [{ type: String }],
  interchange: { type: Boolean, default: false }
});

module.exports = mongoose.model("Station", stationSchema);
