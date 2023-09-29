const express = require("express");
const {
  find_store,
  registerStore,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/find-nearest-store").post(find_store);
router.route("/store-add").post(registerStore);

module.exports = router;
