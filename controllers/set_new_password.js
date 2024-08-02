const user_model = require("../models_schema/user_profile");
const bcrypt = require("bcryptjs");
const { GENSALT } = process.env;

const set_new_password = async (req, res, next) => {
  try {
    const { password, _id } = req.body;
    if (password?.length < 8) {
      next({ message: "password must be more than 8 characters", status: 400 });
    }
    const find_user = await user_model.findById(_id);
    if (!find_user) {
      next({ message: "User not found", status: 404 });
    }
    const genSalt = bcrypt.genSaltSync(+GENSALT);
    const hash = bcrypt.hashSync(password, genSalt);

    await find_user.updateOne({ password: hash });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { set_new_password };
