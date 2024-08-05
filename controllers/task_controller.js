const task_model = require("../models_schema/task_model");

const add_task = async (req, res, next) => {
  try {
    const task = await task_model.create(req.body);
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

module.exports = { add_task };
