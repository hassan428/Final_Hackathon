const error_handler = (err, req, res, next) => {
  let status = 500;

  let data = {
    success: false,
    message: "Internal Server Error",
  };

  if (err.status) status = err.status;

  if (err.message) data.message = err.message;

  return res.status(status).json(data);
};

module.exports = error_handler;
