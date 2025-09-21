const { Router } = require("express");
const ctrl = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const { body, param } = require("express-validator");
const validate = require("../middlewares/validate");

const r = Router();
r.get("/", ctrl.list);
r.get("/search", ctrl.search);

r.post(
  "/:id/image/sign",
  auth,
  param("id").isInt({ min: 1 }),
  body("contentType").isString().isLength({ min: 3 }),
  validate,
  ctrl.signImageUpload
);

r.patch(
  "/:id/image",
  auth,
  param("id").isInt({ min: 1 }),
  body("image_url").isURL(),
  validate,
  ctrl.setImage
);

module.exports = r;
