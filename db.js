require('dotenv').config();
const log = console.log;
const chalk = require("chalk");

const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL);

module.exports = db;
