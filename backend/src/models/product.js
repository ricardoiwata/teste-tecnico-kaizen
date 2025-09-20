const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      price_cents: { type: DataTypes.INTEGER, allowNull: false },
      image_url: { type: DataTypes.STRING },
    },
    { tableName: "products", underscored: true }
  );
  return Product;
};
