const express = require("express");
const {
  logIn,
  verify_otp,
  logOut,
  signUp,
  forget_password,
} = require("../controllers/auth_controllers");
const auth_check = require("../middleware/auth_check_middleware");
// const create_post = require("../controllers/create_post");
const { send_data } = require("../controllers/send_data");
const { non_verify_email } = require("../middleware/verifiy_email");
const { otpVerifyMiddleWare } = require("../middleware/otpVerifyMiddleWare");
const { send_otp } = require("../controllers/send_otp");
const { set_new_password } = require("../controllers/set_new_password");

const router = express.Router();
router.post("/signup", non_verify_email, signUp);
router.post("/login", logIn);
router.post("/verify_otp", otpVerifyMiddleWare, verify_otp);
router.post("/send_otp", send_otp);
router.post("/forget_password", otpVerifyMiddleWare, forget_password);


router.get("/auth_check", auth_check, send_data);
router.post("/set_new_password", set_new_password);
// router.get("/logout", logOut);
// router.post("/createpost", auth_check, create_post);

module.exports = router; // Default Export