const user_model = require("../models_schema/user_profile");

const update_profile = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const find_user = await user_model.findById(_id);
    // console.log("req.body", req.body);

    if (!find_user) {
      next({ message: "user not found", status: 404 });
    }
    const updated_user = await user_model.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated_user) {
      next({ message: "user not found", status: 404 });
    }
    // console.log("find_user", find_user);
    console.log("updated_user", updated_user);
    return res.status(200).json({
      success: true,
      message: "SuccessFully Updated Your Profile!",
      data: updated_user,
    });
    // console.log("req.user", req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = { update_profile };
