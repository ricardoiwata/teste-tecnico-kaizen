const { Router } = require("express");
const auth = require("./auth.routes");
const product = require("./product.routes");
const cart = require("./cart.routes");

const router = Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/cart", cart);

module.exports = router;
