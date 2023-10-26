const Amadeus = require("amadeus");
// const { search } = require("../routes/flightRoute");

const amadeus = new Amadeus({
  clientId: process.env["AMADEUS_CLIENT_ID"],
  clientSecret: process.env["AMADEUS_CLIENT_SECRET"],
});

const logoData = require("../asset/flightLogo.json");

const searchFlights = (req, res) => {
  console.log("working");
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  const dateOfReturn = req.query.returnDate;
  const adults = req.query.adults;
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      returnDate: dateOfReturn,
      adults: adults,
      max: "7",
    })
    .then((response) => {
      res.send(response.result);
    })
    .catch((response) => {
      res.send(response);
    });
};

const searchLogo = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send("ID is required");
  }

  const item = logoData.find((d) => d.id === id.toUpperCase());

  if (!item) {
    return res.status(404).send("ID not found");
  }

  res.send({ logo: item.logo });
};

const iataCode = async (req, res) => {
  const { page, subType, keyword } = req.query;

  try {
    // API call with params we requested from client app
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": page * 10,
    });

    // Sending response for client
    res.json(JSON.parse(response.body));
  } catch (err) {
    console.error("Error fetching IATA code:", err);
    res.status(500).json({ message: "Internal server error" }); // You can adjust the error message based on the nature of the error.
  }
};

module.exports = { searchFlights, searchLogo, iataCode };
