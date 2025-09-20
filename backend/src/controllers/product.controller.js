const { Product } = require("../models");
const { Op } = require("sequelize");

exports.list = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const offset = (page - 1) * limit;

    const { rows, count } = await Product.findAndCountAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    res.json({ ok: true, data: { items: rows, page, limit, total: count } });
  } catch (e) {
    next(e);
  }
};

exports.search = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ ok: true, data: { items: [] } });

    const items = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { code: { [Op.like]: `%${q}%` } },
        ],
      },
      limit: 50,
      order: [["name", "ASC"]],
    });

    res.json({ ok: true, data: { items } });
  } catch (e) {
    next(e);
  }
};
