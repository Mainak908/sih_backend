const ErrorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");
const Useracc = require("../models/userAccModel");

const checkAuth = async (req) => {
  const { myCookie } = req.cookies;

  if (!myCookie) {
    return new ErrorHandler("Please Login to access this resource", 401);
  }
  const decodeData = jwt.verify(myCookie, process.env.JWT_SECRET);

  const user = await Useracc.findById(decodeData.id);
  return user;
};

module.exports = checkAuth;
