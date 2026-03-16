if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { default: rateLimit } = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(globalLimiter);
app.use(router);

module.exports = app;
