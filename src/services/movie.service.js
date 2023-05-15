const { Movie } = require("../models");
const ApiError = require("../helpers/ApiError");

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return JSON.parse(JSON.stringify(movie));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const findOne = async (criteria) => {
  try {
    const movie = await Movie.findOne({ ...criteria });
    if (!movie || movie.isDeleted) {
      throw new ApiError(404, "Movie not found");
    }
    return JSON.parse(JSON.stringify(movie));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const fetchAll = async (criteria = {}, options = {}) => {
  const { sort = { createdAt: -1 }, limit, page } = options;

  const _limit = parseInt(limit, 10);
  const _page = parseInt(page, 10);

  let movie = await Movie.find(criteria)
    .sort(sort)
    .limit(_limit)
    .skip(_limit * (_page - 1));

  return { movie, page: _page };
};

const count = async (criteria = {}) => {
  return await Movie.find(criteria).countDocuments();
};

const updateMovie = async (id, data) => {
  let movie = await Movie.findById(id);

  if (!movie || movie.isDeleted) {
    throw new ApiError(404, "Movie not found");
  }

  Object.assign(movie, data);

  await movie.save();
  return movie;
};

const deleteMovie = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  Object.assign(movie, { isDeleted: true });
  await movie.save();
  return movie;
};


module.exports = {
  createMovie,
  findOne,
  fetchAll,
  count,
  updateMovie,
  deleteMovie
};
