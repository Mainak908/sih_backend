const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product price"],
    maxlength: [8, "Price cannot cxceed 8 charaters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxlength: [4, "Stock cannot exceed chareters"],
    default: 1,
  },
});

module.exports = mongoose.model("Product", productSchema);
