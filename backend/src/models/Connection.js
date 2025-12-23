const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  time: { type: Number, required: true },
  line: { type: String, required: true }
});

module.exports = mongoose.model("Connection", connectionSchema);
