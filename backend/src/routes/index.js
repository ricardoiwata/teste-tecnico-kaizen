const { Router } = require("express");
const auth = require("./auth.routes");
const product = require("./product.routes");

const router = Router();

router.use("/auth", auth);
router.use("/products", product);

module.exports = router;
