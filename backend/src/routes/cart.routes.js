const { Router } = require("express");
const { body, param } = require("express-validator");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const ctrl = require("../controllers/cart.controller");

const r = Router();

r.use(auth);

r.get("/", ctrl.list);

r.post(
  "/",
  body("product_id").isInt({ min: 1 }),
  body("quantity").optional().isInt({ min: 1 }),
  validate,
  ctrl.add
);

r.put(
  "/:id",
  param("id").isInt({ min: 1 }),
  body("quantity").isInt({ min: 1 }),
  validate,
  ctrl.update
);

r.delete("/:id", param("id").isInt({ min: 1 }), validate, ctrl.remove);

module.exports = r;
