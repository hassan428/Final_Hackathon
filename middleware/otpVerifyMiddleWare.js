const code_model = require("../models_schema/user_codes");
const user_model = require("../models_schema/user_profile");

const otpVerifyMiddleWare = async (req, res, next) => {
  try {
    const { code: otp, _id, email } = req.body;
    // console.log("req.body", req.body);
    const find_user = _id
      ? await user_model.findById(_id)
      : await user_model.findOne({ email });
    // console.log("find_user", find_user);

    if (!find_user) {
      next({ message: "user not found", status: 404 });
    }
    // console.log("find_user._id", find_user._id);

    const otpFound = await code_model.findOne({ user_id: find_user._id });
    // console.log("otpFound", otpFound);

    if (!otpFound) {
      next({ message: "otp not found", status: 404 });
    }
    const { code, typeWrongCode } = otpFound;

    if (code !== otp) {
      await otpFound.updateOne({ typeWrongCode: typeWrongCode + 1 });
      console.log(typeWrongCode);
      if (typeWrongCode >= 2) {
        await otpFound.deleteOne();
        next({ message: "otp expired", status: 404 });
      }
      next({ message: "OTP is not correct! try One more time", status: 400 });
    }
    req.user = { ...req.body, otp, code, find_user, otpFound };
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { otpVerifyMiddleWare };
