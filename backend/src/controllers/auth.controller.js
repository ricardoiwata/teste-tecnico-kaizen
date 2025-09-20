const { User } = require("../models");
const { sign } = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(409).json({ ok: false, error: "Email already in use" });

    const password_hash = await bcrypt.hash(password);
    const user = await User.create({ name, email, password_hash });

    return res.status(201).json({
      ok: true,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    const token = sign({ sub: user.id, email: user.email });
    return res.json({ ok: true, data: { token } });
  } catch (e) {
    next(e);
  }
};
