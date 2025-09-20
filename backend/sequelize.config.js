require("dotenv").config();
module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: process.env.DB_STORAGE || "./database.sqlite",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    logging: false,
  },
};
