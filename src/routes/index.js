const express = require("express");
const router = new express.Router();

const userRouter = require("./user.route.js");

router.use("/user", userRouter);

module.exports = router;
