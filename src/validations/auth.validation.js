const ApiError = require("../helpers/ApiError");
const jwt = require("jsonwebtoken");

const validateToken = function (req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    throw new ApiError(401, "Authentication required");
  }

  const bearer = bearerHeader.split(" ");
  const [, token] = bearer;
  req.token = token;
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      throw new ApiError(401, "Authentication required");
    } else {
      req.user = authData.user; // Add User Id to request
      next();
    }
  });
};


module.exports = {
  validateToken
};
