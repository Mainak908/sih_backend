const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  vendor_id: {
    type: String,
    required: true,
  },
  business_email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  location: {
    type: Object,
    index: "2dsphere",
    required: true,
  },
});

module.exports = mongoose.model("Stores", userSchema);
