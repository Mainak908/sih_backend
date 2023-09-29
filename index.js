const express = require("express");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary").v2;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(fileUpload());

connectDB();

const user = require("./routes/userroutes");
app.use("/api/v1", user);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
