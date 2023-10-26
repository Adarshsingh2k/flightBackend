// routes/flightRoutes.js
const express = require("express");
const router = express.Router();
const flightController = require("../controller/flightController");

router.get("/flight-search", flightController.searchFlights);
router.get("/flight-logo", flightController.searchLogo);
router.get("/iata-code", flightController.iataCode);

module.exports = router;
