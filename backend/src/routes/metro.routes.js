const express = require("express");
const router = express.Router();

const { getStations, getConnections } = require("../controllers/metro.controller");
const { getRoute } = require("../controllers/route.controller");

router.get("/stations", getStations);
router.get("/connections", getConnections);
router.get("/route", getRoute);

module.exports = router;