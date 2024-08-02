const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { email_send } = require("../services/nodemailer_service");
const { generateOtp } = require("../services/genereate_otp");
const user_model = require("../models_schema/user_profile");
const code_model = require("../models_schema/user_codes");

const { GENSALT, JWT_SECRET } = process.env;

const signUp = async (req, res, next) => {
  try {
    const { user } = req;
    const { password, username, email } = user;

    const genSalt = bcrypt.genSaltSync(+GENSALT);
    const hash = bcrypt.hashSync(password, genSalt);

    const create_user = await user_model.create({ ...user, password: hash });
    const { _id } = create_user;
    const otp = generateOtp();

    await code_model.create({ user_id: _id, code: otp }).catch(async (err) => {
      await user_model.deleteOne(_id);
      throw err.message;
    });

    await email_send(email, username, otp).catch(async (err) => {
      await code_model.deleteOne({ user_id: _id });
      await user_model.deleteOne(_id);
      throw err;
    });

    const send_data = { ...create_user.toObject() };
    delete send_data.password;

    return res.status(200).json({
      message: "user created successfully",
      data: send_data,
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const find_user = await user_model.findOne({ email });

    if (!find_user) {
      next({ message: "user not found!", status: 404 });
    }
    if (!find_user.isVerified) {
      next({
        message:
          "Your email hasn't been verified yet. Please sign up and verify your email.",
        status: 404,
      });
    }

    const compare_password = bcrypt.compareSync(password, find_user.password);

    if (!compare_password) {
      next({ message: "password is incorrect!", status: 404 });
    }

    const send_data = { ...find_user.toObject() };
    delete send_data.password;

    const jwt_payload = { id: find_user._id };

    const token = jwt.sign(jwt_payload, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      success: true,
      message: "user found successfully",
      data: send_data,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const verify_otp = async (req, res, next) => {
  try {
    const { otp, code, find_user, otpFound } = req.user;
    if (code == otp) {
      await otpFound.deleteOne();
      await find_user.updateOne({ isVerified: true });

      const jwt_payload = { id: find_user._id };
      const token = jwt.sign(jwt_payload, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        message: "SuccessFully Verified!",
        token,
        data: find_user,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { /*logOut,*/ signUp, logIn, verify_otp };
