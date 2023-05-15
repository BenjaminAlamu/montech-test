const express = require("express");
const validate = require("../helpers/validate");

const { movieController } = require("../controllers");
const { authValidation, movieValidation } = require("../validations");

const router = express.Router();

router.post(
  "/",
  [authValidation.validateToken, validate(movieValidation.create)],
  movieController.createMovie
);

router.put(
  "/:_id",
  [authValidation.validateToken, validate(movieValidation.get)],
  movieController.editMovie
);

router.delete(
  "/:_id",
  [authValidation.validateToken, validate(movieValidation.get)],
  movieController.deleteMovie
);

router.get("/:_id", [validate(movieValidation.get)], movieController.listOne);

router.get("/", [authValidation.validateToken], movieController.list);

module.exports = router;
