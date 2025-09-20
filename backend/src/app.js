const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());

module.exports = app;
