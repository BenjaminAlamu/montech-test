const express = require("express");
const router = new express.Router();

const userRouter = require("./user.route.js");
const movieRouter = require("./movie.route.js");

router.use("/user", userRouter);
router.use("/movie", movieRouter);

module.exports = router;
