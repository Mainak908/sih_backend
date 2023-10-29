const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/prodModel");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const resp = await Product.create(req.body);

  res.status(200).json({
    success: true,
    resp,
  });
});

exports.fetchproduct = catchAsyncError(async (req, res, next) => {
  const resp = await Product.find({});
  res.status(200).json({
    success: true,
    resp,
  });
});

exports.singleproduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const resp = await Product.findById(id);
  res.status(200).json({
    success: true,
    resp,
  });
});
