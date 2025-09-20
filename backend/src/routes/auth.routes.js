const { Router } = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const ctrl = require("../controllers/auth.controller");

const r = Router();

r.post(
  "/register",
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  ctrl.register
);

r.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  ctrl.login
);

module.exports = r;
