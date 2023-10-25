const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const Stores = require("../models/geolocation");
const Useracc = require("../models/userAccModel");
const checkAuth = require("../utils/checkAuth");
const Listuser = require("../models/listUserModel");
const jwt = require("jsonwebtoken");

//register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await Useracc.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res, "successfully registered");
});

//loginUser
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both or not
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email & Password", 400));
  }
  const user = await Useracc.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  sendToken(user, 200, res, "successfully logged in");
});

//Logout User

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .cookie("myCookie", null, {
      expires: new Date(Date.now()),
      httpOnly: false,
      secure: true,
      sameSite: "None",
      withCredentials: true,
    })
    .status(200)
    .json({
      success: true,
    });
});

//find nearest store

exports.find_store = catchAsyncError(async (req, res) => {
  const { lat, long } = req.body;
  try {
    const store_data = await Stores.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          key: "location",
          maxDistance: parseFloat(10000) * 1609,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]);

    res.status(200).send({ success: true, data: store_data });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

//nearest store add

exports.registerStore = catchAsyncError(async (req, res, next) => {
  const { vendor_id, business_email, address, pin, location } = req.body;

  const user = await Stores.create({
    vendor_id,
    business_email,
    address,
    pin,
    location,
  });
  res.send({ success: true });
});

exports.aboutUser = catchAsyncError(async (req, res, next) => {
  const user = await checkAuth(req);

  if (!user) return new ErrorHandler("Login First", 401);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.submissuser = catchAsyncError(async (req, res, next) => {
  const user = await checkAuth(req);
  const { token, address, public_id } = req.body;

  const resp = await Listuser.create({
    user: user._id,
    token,
    address,
    public_id,
  });
  res.status(200).json({
    success: true,
  });
});

exports.allsubmissuserdetails = catchAsyncError(async (req, res, next) => {
  const resp = await Listuser.find({});
  res.json({
    success: true,
    resp,
  });
});

exports.deleteuserdetails = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  const resp = await Listuser.deleteOne({ token });
  res.json({
    success: true,
    resp,
  });
});
