const { Product } = require("../models");
const { Op } = require("sequelize");
const { createPresignedPutURL } = require("../utils/s3");
const crypto = require("crypto");

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

exports.signImageUpload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contentType } = req.body;

    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });

    const ext = contentType.split("/")[1] || "bin";
    const key = `products/${product.code}-${crypto
      .randomBytes(6)
      .toString("hex")}.${ext}`;

    const uploadUrl = await createPresignedPutURL({
      bucket: process.env.S3_BUCKET,
      key,
      contentType,
      expiresIn: 60, // 1 min
    });

    const fileUrl = `${process.env.S3_PUBLIC_BASE}/${key}`;
    return res.json({ ok: true, data: { uploadUrl, fileUrl, key } });
  } catch (e) {
    next(e);
  }
};

exports.setImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ ok: false, error: "Product not found" });

    product.image_url = image_url;
    await product.save();

    return res.json({ ok: true, data: product });
  } catch (e) {
    next(e);
  }
};
