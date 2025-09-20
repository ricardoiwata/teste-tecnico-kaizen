const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.hash = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
exports.compare = (plain, hash) => bcrypt.compare(plain, hash);
