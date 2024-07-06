const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { email_send } = require("../services/nodemailer_service");
const { generateOtp } = require("../services/genereate_otp");
const user_model = require("../models_schema/user_profile");
const code_model = require("../models_schema/user_codes");

const { GENSALT, JWT_SECRET, COOKIE_AUTH_NAME } = process.env;

const signUp = async (req, res, next) => {
  try {
    const { user } = req;
    const { password, username, email } = user;
    if (password.length < 8) {
      next({
        message: "Your password must be more than 8 characters",
        status: 400,
      });
    }

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

    const create_token = jwt.sign(jwt_payload, JWT_SECRET, { expiresIn: "7d" });
    // const expires_cookie = new Date(Date.now() + 60 * 60 * 24 * 30);

    // res.cookie(COOKIE_AUTH_NAME, create_token, {
    //   maxAge: expires_cookie,
    //   // httpOnly: true,
    //   // secure: true,
    //   // sameSite: "none",
    // });
    return res.status(200).json({
      success: true,
      message: "user found successfully",
      data: send_data,
      create_token,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    res.cookie(COOKIE_AUTH_NAME, "empty", { maxAge: 5000 });
    return res.status(200).json({
      success: true,
      message: "Logout successful. Thank you for using our service!",
    });
  } catch (error) {}
  next(error);
};

const verify_otp = async (req, res, next) => {
  try {
    const { otp, code, find_user, otpFound } = req.user;
    if (code == otp) {
      await otpFound.deleteOne();
      await find_user.updateOne({ isVerified: true });

      const jwt_payload = { id: find_user._id };
      const create_token = jwt.sign(jwt_payload, JWT_SECRET, {
        expiresIn: "7d",
      });

      // const expires_cookie = new Date(Date.now() + 60 * 60 * 24 * 30);

      // res.cookie(COOKIE_AUTH_NAME, create_token, {
      //   maxAge: expires_cookie,
      //   // httpOnly: true,
      //   // secure: true,
      //   // sameSite: "none",
      // });

      return res.status(200).json({
        success: true,
        message: "SuccessFully Verified!",
        create_token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const forget_password = async (req, res, next) => {
  const { otp, code, find_user, otpFound } = req.user;

  try {
    if (code == otp) {
      await otpFound.deleteOne();
      // token send
      return res.status(200).json({
        success: true,
        message: "SuccessFully Verified!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { logOut, forget_password, signUp, logIn, verify_otp };
