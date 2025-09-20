const { Router } = require("express");

const router = Router();

router.get("/ping", (req, res) => {
  res.json({ ok: true, data: "pong" });
});

module.exports = router;
