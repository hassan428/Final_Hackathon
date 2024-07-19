const jwt = require("jsonwebtoken");
const user_model = require("../models_schema/user_profile");
const { JWT_SECRET } = process.env;

const auth_check = async (req, res, next) => {
  try {
    const auth_token = req.headers.authorization.split(" ")[1];
    // console.log("auth_token", auth_token);

    if (!auth_token) {
      next({ message: "Unauthorized", status: 401 });
    }

    const verify_token = jwt.verify(auth_token, JWT_SECRET);

    const find_user = await user_model
      .findById(verify_token.id)
      .select("-password");

    if (!find_user) {
      next({ status: 404, message: "User not found" });
    }

    // const find_other_user = await user_model
    //   .find({
    //     bloodGroup: find_user.bloodGroup,
    //     _id: { $ne: find_user._id },
    //     isVerified: true,
    //   })
    //   .select("-password");

    // console.log(find_other_user);

    req.user = find_user;
    // req.other_user = find_other_user;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      next({ message: "Session expired", status: 401 });
    }
    next(error);
  }
};

module.exports = auth_check;
