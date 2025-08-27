const express = require("express");
const dotEnv = require("dotenv");
const dbConnection = require("./config/DbConnect");
const transcationRoute = require("./routes/TranscationRoute");
const errorMiddleWare = require("./middleware/ErrorMiddleWare");
const cors = require("cors");
const app = express();

dotEnv.config();
app.use(cors());
app.use(express.json());
app.use("/api/transcation", transcationRoute);

app.use(errorMiddleWare);
const server = app.listen(process.env.PORT, () => {
  console.log(
    "server listening at " + process.env.PORT + " in " + process.env.NODE_ENV
  );
  dbConnection();
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("Server close due to some issue");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
