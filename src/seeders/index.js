const mongoose = require("mongoose");
const logger = require("../helpers/logger");
require("dotenv").config();
const { User, Movie } = require("../models");
const { getUserData } = require("./mock/user.mock");
const { getMovieData } = require("./mock/movie.mock");

const connectDB = async () => {
  logger.info("connecting to db");

  await mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const clearDB = async () => {
  logger.warn("clearing db");
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany()
    )
  );
};

const disconnectDB = async () => {
  logger.warn("disconnecting from db");
  await mongoose.disconnect();
};

const seedDB = async () => {
  try {
    logger.info("Seeding Database");
    await connectDB();
    await clearDB();

    logger.info("Creating Users");
    const fakeUsers = await User.create(await getUserData());

    logger.info("Creating Random Movies");
    await Movie.create(await getMovieData(fakeUsers));

    logger.info("seeder completed");
  } catch (e) {
    logger.error(e);
  }

  await disconnectDB();
};

seedDB();
