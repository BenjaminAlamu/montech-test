const catchAsync = require("../helpers/catchAsync");
const { movieService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const createMovie = catchAsync(async function (req, res) {
  const movie = await movieService.createMovie({
    ...req.body,
    posterId: req.user._id,
  });
  res.status(201).send({
    message: "Movie created successfully",
    data: {
      movie,
    },
  });
});

const editMovie = catchAsync(async function (req, res) {
  const movie = await movieService.updateMovie(req.params._id, req.body);

  res.status(200).send({
    message: "Movie updated successfully",
    data: {
      movie,
    },
  });
});

const list = catchAsync(async function (req, res) {
  const filter = { isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { movie, page } = await movieService.fetchAll(filter, options);
  const count = await movieService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Movie Fetched successfully",
    data: {
      count,
      currentPage: page,
      movie,
    },
  });
});

const listOne = catchAsync(async function (req, res) {
  const movie = await movieService.findOne({
    _id: req.params._id,
    isDeleted: false,
  });
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }
  res.status(200).send({
    status: "success",
    message: "Movie fetched Successfully",
    data: {
      movie,
    },
  });
});

const deleteMovie = catchAsync(async function (req, res) {
  const movie = await movieService.deleteMovie(req.params._id);

  res.status(200).send({
    message: "Movie deleted successfully",
    data: {
      movie,
    },
  });
});

module.exports = {
  createMovie,
  editMovie,
  list,
  deleteMovie,
  listOne,
};
