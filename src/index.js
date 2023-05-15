const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

const { errorConverter, errorHandler } = require("./helpers/error");
app.use(cors(""));

require("./config/mongoose");
const logger = require("./helpers/logger");

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json",
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoded",
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use("/api/v1", require("./routes/index"));
app.get("/", (req, res) =>
  res.status(200).send({
    message:
      "Welcome, you should not be here though, please visit the documentation link here: https://documenter.getpostman.com/view/4530919/2s93eeRV7y",
  })
);
app.get("*", (req, res) =>
  res.status(404).send({
    message: "Invalid route",
  })
);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app.listen(port, () => {
  logger.info(`Server started at ${port}`);
});
