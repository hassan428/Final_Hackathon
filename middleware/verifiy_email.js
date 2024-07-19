const code_model = require("../models_schema/user_codes");
const user_model = require("../models_schema/user_profile");

const non_verify_email = async (req, res, next) => {
  try {
    const { email, username, phone_number } = req.body;

    const find_user = await user_model.find({
      $or: [
        { email: email },
        { username: username },
        { phone_number: phone_number },
      ],
    });
    if (find_user.length == 0) {
      req.user = req.body;
      next();
    } else {
      for (const user of find_user) {
        if (!user.isVerified) {
          await user.deleteOne();
          await code_model.deleteOne({ user_id: user._id });
        }
      }
    }
    req.user = req.body;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { non_verify_email };
