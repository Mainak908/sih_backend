//after form submission data will be saved in this db

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Useracc",
    required: true,
  },
  token: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  public_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Userlist", userSchema);
