const { Sequelize } = require("sequelize");
const config = require("../../sequelize.config").development;

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
  host: config.host,
  username: config.username,
  password: config.password,
  logging: config.logging,
});

const User = require("./user")(sequelize);
const Product = require("./product")(sequelize);
const CartItem = require("./cartItem")(sequelize);

User.hasMany(CartItem, { foreignKey: "user_id" });
CartItem.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = { sequelize, Sequelize, User, Product, CartItem };
