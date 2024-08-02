const express = require("express");
const {
  logIn,
  verify_otp,
  signUp,
} = require("../controllers/auth_controllers");
const auth_check = require("../middleware/auth_check_middleware");
const { send_data } = require("../controllers/send_data");
const { non_verify_email } = require("../middleware/verifiy_email");
const { otpVerifyMiddleWare } = require("../middleware/otpVerifyMiddleWare");
const { send_otp } = require("../controllers/send_otp");
const { set_new_password } = require("../controllers/set_new_password");
const { create_team } = require("../controllers/team_controllers");
const { update_profile } = require("../controllers/update_profile");
const { add_task } = require("../controllers/task_controller");

const router = express.Router();
router.post("/signup", non_verify_email, signUp);
router.post("/login", logIn);
router.post("/verify_otp", otpVerifyMiddleWare, verify_otp);
router.post("/send_otp", send_otp);

router.get("/auth_check", auth_check, send_data);
router.put("/update_profile", update_profile);
router.post("/set_new_password", set_new_password);
router.post("/create_team", create_team);
router.post("/add_task", add_task);

module.exports = router; // Default Export
