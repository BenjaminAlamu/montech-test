const Joi = require("@hapi/joi");
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const create = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": `Movie Name cannot be an empty field`,
      "any.required": `Movie Name is a required field`,
      "any.pattern": `Movie Name can only contain alphabets, numbers, dashes and underscores`,
    }),
    year: Joi.number().required().messages({
      "any.empty": `Year cannot be an empty field`,
      "any.required": `Year is a required field`,
    }),
    genre: Joi.string().required().messages({
      "any.empty": `Genre cannot be an empty field`,
      "any.required": `Genre is a required field`,
    }),
    rating: Joi.string().required().messages({
      "any.empty": `Rating cannot be an empty field`,
      "any.required": `Rating is a required field`,
    })
  }),
};

const get = {
  params: Joi.object().keys({
    _id: Joi.string().pattern(mongoIdPattern).required().messages({
      "string.empty": `Movie ID Must be passed cannot be an empty field`,
      "any.required": `Movie ID is a required field`,
      "string.pattern": `Movie ID must be a valid Mongo ID`,
    }),
  }),
};

module.exports = {
  create,
  get
};
