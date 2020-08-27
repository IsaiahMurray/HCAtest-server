const log = console.log;
const chalk = require("chalk");

const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://postgres:weewoo123@localhost:5432/hca_database"
);

module.exports = db;
