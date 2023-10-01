const ErrorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return new ErrorHandler("Please Login to access this resource", 401);
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decodeData.id);
};

module.exports = checkAuth;
