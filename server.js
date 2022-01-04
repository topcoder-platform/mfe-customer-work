/* global process */
/**
 * Self Service backend server
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// static site serve
app.use(
  "/self-service-app",
  express.static("./dist", {
    setHeaders: function setHeaders(res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
  })
);

// plugins
app.use(bodyParser.json());

// API routes

// ping route
app.get("/", function (req, res) {
  res.send("alive");
});

const PORT = process.env.PORT || 8519;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
