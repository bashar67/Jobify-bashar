const express = require("express");
const router = express.Router();

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const {
  Register,
  Login,
  updateUser,
  getCurrentUser,
  logout,
} = require("../controllers/authController");

const authenticateUser = require("../middleware/auth");
const testUser = require("../middleware/testUser");

router.route("/register").post(apiLimiter, Register);
router.route("/login").post(apiLimiter, Login);
router.get("/logout", logout);
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

module.exports = router;
