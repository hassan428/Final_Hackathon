require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes/index");
const app = express();
const { PORT } = process.env;
const cors = require("cors");
const connect_to_database = require("./config/mongoDb");
const error_handler = require("./controllers/error_handler");

try {
  // app.use(
  //   cors({
  //     origin: function (origin, callback) {
  //       return callback(null, true);
  //     },
  //     credentials: true,
  //     optionsSuccessStatus: 200,
  //   })
  // );

  app.use(express.json()); // for parsing application/json
  app.use(allRoutes);
  connect_to_database();

  app.use(error_handler);
} catch (error) {
  console.log("error", error);
}
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
