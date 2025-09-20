const { Router } = require("express");
const ctrl = require("../controllers/product.controller");

const r = Router();
r.get("/", ctrl.list); // GET /api/products?page=&limit=
r.get("/search", ctrl.search); // GET /api/products/search?q=
module.exports = r;
