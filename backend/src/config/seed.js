const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");
const Station = require("../models/Station");
const Connection = require("../models/Connection");

const seedData = async () => {
  await connectDB();

  // Clear old data
  await Station.deleteMany({});
  await Connection.deleteMany({});

  // Create stations
  const stations = await Station.insertMany([
    { name: "Rajiv Chowk", lines: ["Blue","Yellow"], interchange: true },
    { name: "Mandi House", lines: ["Blue","Violet"], interchange: true },
    { name: "Yamuna Bank", lines: ["Blue"], interchange: false },
    { name: "Noida City Centre", lines: ["Blue"], interchange: false },
    { name: "Kashmere Gate", lines: ["Red","Yellow","Violet"], interchange: true }
  ]);

  // Create connections
  const connections = await Connection.insertMany([
    { from: stations[0]._id, to: stations[1]._id, time: 5, line: "Blue" },
    { from: stations[1]._id, to: stations[2]._id, time: 6, line: "Blue" },
    { from: stations[2]._id, to: stations[3]._id, time: 8, line: "Blue" },
    { from: stations[0]._id, to: stations[4]._id, time: 4, line: "Yellow" },
    { from: stations[4]._id, to: stations[1]._id, time: 7, line: "Violet" }
  ]);

  console.log("Database seeded!");
  process.exit();
};

seedData();
