const { verify } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: "Unauthorized" });
  try {
    req.user = verify(token);
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
};
