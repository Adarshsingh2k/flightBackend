const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const Amadeus = require("amadeus");

const app = express();
const port = process.env.PORT || 5000;

var amadeus = new Amadeus({
  clientId: process.env["AMADEUS_CLIENT_ID"],
  clientSecret: process.env["AMADEUS_CLIENT_SECRET"],
});

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get(`/flight-search`, (req, res) => {
//   console.log("working");
//   const originCode = req.query.originCode;
//   const destinationCode = req.query.destinationCode;
//   const dateOfDeparture = req.query.dateOfDeparture;
//   // Find the cheapest flights
//   amadeus.shopping.flightOffersSearch
//     .get({
//       originLocationCode: originCode,
//       destinationLocationCode: destinationCode,
//       departureDate: dateOfDeparture,
//       adults: "1",
//       max: "7",
//     })
//     .then(function (response) {
//       res.send(response.result);
//     })
//     .catch(function (response) {
//       res.send(response);
//     });
// });

app.use("/api/flight", require("./routes/flightRoute"));
app.listen(port, () => {
  console.log(`server is up at ${port}`);
});
