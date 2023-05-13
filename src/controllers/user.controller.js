const catchAsync = require("../helpers/catchAsync");
const { userService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const createUser = catchAsync(async function (req, res) {
  const user = await userService.register(req.body);
  const token = await userService.generateToken(user);
  res.status(201).send({
    message: "User created successfully",
    data: {
      user,
      token
    },
  });
});

const login = catchAsync(async function (req, res) {
  const user = await userService.login(req.body);
  const token = await userService.generateToken(user);
  res.status(201).send({
    message: "User login  successfully",
    data: {
      user,
      token
    },
  });
});

const editUser = catchAsync(async function (req, res) {
  const user = await userService.updateUser(req.user._id, req.body);

  res.status(200).send({
    message: "User updated successfully",
    data: {
      user,
    },
  });
});

const list = catchAsync(async function (req, res) {
  const filter = { isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { user, page } = await userService.fetchAll(filter, options);
  const count = await userService.count(filter);
  res.status(200).send({
    status: "success",
    message: "User Fetched successfully",
    data: {
      count,
      currentPage: page,
      user,
    },
  });
});

const listOne = catchAsync(async function (req, res) {
  const user = await userService.findOne({
    _id: req.params._id,
    isDeleted: false,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).send({
    status: "success",
    message: "User fetched Successfully",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async function (req, res) {
  await userService.deleteUser(req.user._id);

  res.status(200).send({
    message: "User deleted successfully",
    data: {},
  });
});

module.exports = {
  createUser,
  editUser,
  list,
  deleteUser,
  listOne,
  login
};
