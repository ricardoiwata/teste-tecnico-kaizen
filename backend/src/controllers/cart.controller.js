const { CartItem, Product } = require("../models");

exports.list = async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
      where: { user_id: req.user.sub },
      include: [{ model: Product }],
      order: [["id", "ASC"]],
    });

    const total_cents = items.reduce(
      (acc, it) => acc + it.quantity * it.Product.price_cents,
      0
    );

    res.json({ ok: true, data: { items, total_cents } });
  } catch (e) {
    next(e);
  }
};

exports.add = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const qty = Math.max(parseInt(quantity) || 1, 1);

    const [item, created] = await CartItem.findOrCreate({
      where: { user_id: req.user.sub, product_id },
      defaults: { quantity: qty },
    });

    if (!created) {
      item.quantity += qty;
      await item.save();
    }

    res.status(201).json({ ok: true, data: item });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const qty = Math.max(parseInt(quantity) || 1, 1);

    const item = await CartItem.findOne({
      where: { id, user_id: req.user.sub },
    });
    if (!item) return res.status(404).json({ ok: false, error: "Not found" });

    item.quantity = qty;
    await item.save();

    res.json({ ok: true, data: item });
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await CartItem.destroy({
      where: { id, user_id: req.user.sub },
    });
    if (!deleted)
      return res.status(404).json({ ok: false, error: "Not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
