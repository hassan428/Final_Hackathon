const user_model = require("../models_schema/user_profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GENSALT, JWT_SECRET, COOKIE_AUTH_NAME } = process.env;

const set_new_password = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (password.length < 8) {
      next({ message: "Password must be more than 8 characters", status: 400 });
    }
    const find_user = await user_model.findOne({ email });
    if (!find_user) {
      next({ message: "User not found", status: 404 });
    }
    const genSalt = bcrypt.genSaltSync(+GENSALT);
    const hash = bcrypt.hashSync(password, genSalt);

    await find_user.updateOne({ password: hash });

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
      message: "password updated successfully!",
      create_token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { set_new_password };
