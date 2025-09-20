const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const error = require("./middlewares/error");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", routes);

app.use(error);

module.exports = app;
