const CustomAPIError = require("./customError");
const BadRequest = require("./badRequest");
const Unauthenticated = require("./Unauthenticated");
const NotFound = require("./notFound");

module.exports = {
  NotFound,
  Unauthenticated,
  BadRequest,
  CustomAPIError,
};
