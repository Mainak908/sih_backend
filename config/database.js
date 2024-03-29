const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server:${data.connection.host}`);
    });
};

module.exports = connectDB;
