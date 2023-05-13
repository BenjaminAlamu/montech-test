const Joi = require("@hapi/joi");
const namePattern = /^[A-Za-z0-9_-]*$/;
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const register = {
  body: Joi.object().keys({
    userName: Joi.string().pattern(namePattern).required().messages({
      "string.empty": `Username cannot be an empty field`,
      "any.required": `Username is a required field`,
      "any.pattern": `Username can only contain alphabets, numbers, dashes and underscores`,
    }),
    password: Joi.string().required().messages({
      "any.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    })
  }),
};

const login = {
  body: Joi.object().keys({
    userName: Joi.string().pattern(namePattern).required().messages({
      "string.empty": `Username cannot be an empty field`,
      "any.required": `Username is a required field`,
      "any.pattern": `Username can only contain alphabets, numbers, dashes and underscores`,
    }),
    password: Joi.string().required().messages({
      "any.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
  }),
};

const get = {
  params: Joi.object().keys({
    _id: Joi.string().pattern(mongoIdPattern).required().messages({
      "string.empty": `User ID Must be passed cannot be an empty field`,
      "any.required": `User ID is a required field`,
      "string.pattern": `User ID must be a valid ID`,
    }),
  }),
};

module.exports = {
  register,
  get,
  login,
};
