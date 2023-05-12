const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { errorConverter, errorHandler } = require("./helpers/error");
const UPLOAD_PATH = path.join("./public/uploads");
app.use(cors(""));

require("./config/mongoose");
const logger = require("./config/logger");

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
app.use(express.static(UPLOAD_PATH));
app.use(errorConverter);
app.use(errorHandler);

const server = app.listen(port, () => {
  logger.info(`Node Starter Project starts at port ${port}`);
});
