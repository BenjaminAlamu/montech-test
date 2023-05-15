const mongoose = require("mongoose");
const logger = require("../helpers/logger");
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    logger.info("Connected successfully");
  })
  .catch((err) => {
    logger.error({ message: "Error connecting to database", ...err });
  });

module.exports = { mongoose };
