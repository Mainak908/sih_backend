const express = require("express");
const {
  find_store,
  registerStore,
  registerUser,
  loginUser,
  logoutUser,
  aboutUser,
  submissuser,
  allsubmissuserdetails,
  deleteuserdetails,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/find-nearest-store").post(find_store);
router.route("/store-add").post(registerStore);
router.route("/me").get(aboutUser);
router.route("/submit-user").post(submissuser);
router.route("/get-all-subuser").get(allsubmissuserdetails);
router.route("/delete-subuser").delete(deleteuserdetails);

module.exports = router;
