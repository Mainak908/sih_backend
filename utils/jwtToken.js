const sendToken = (user, statusCode, res, msg) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
    withCredentials: true,
  };
  res.cookie("myCookie", token, options).status(statusCode).json({
    success: true,
    message: msg,
    user,
    token,
  });
  console.log("cookie set");
};

module.exports = sendToken;
