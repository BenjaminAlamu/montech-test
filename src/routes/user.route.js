const express = require("express");
const validate = require("../helpers/validate");

const { userController } = require("../controllers");
const { userValidation, authValidation } = require("../validations");

const router = express.Router();

router.post("/login", [validate(userValidation.login)], userController.login);

router.post("/register", [validate(userValidation.createUser)], userController.createUser);

router.get("/:_id", [validate(userValidation.get)], userController.listOne);

router.post("/", [validate(userValidation.create)], userController.createUser);

router.put("/", [authValidation.validateToken], userController.editUser);

router.delete("/", [authValidation.validateToken], userController.deleteUser);

router.get("/", userController.list);

module.exports = router;
