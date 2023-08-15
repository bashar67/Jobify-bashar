const express = require("express");

const router = express.Router();

const {
  Register,
  Login,
  updateUser,
} = require("../controllers/authController");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/updateUser").post(updateUser);

module.exports = router;
