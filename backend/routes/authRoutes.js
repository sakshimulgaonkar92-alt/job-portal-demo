const express = require("express");
const router = express.Router();
const { register, login, sendOtp, verify } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/otp", sendOtp);
router.post("/verify", verify);

module.exports = router;
