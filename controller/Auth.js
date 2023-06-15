const {
  NotFound,
  Unauthenticated,
  BadRequest,
  CustomAPIError,
} = require("../errors");
const UserModel = require("../models/user");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please fill out all required fields");
  }
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please fill out all required fields ni**a");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Unauthenticated("Wrong Email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Unauthenticated("Wrong email or password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
