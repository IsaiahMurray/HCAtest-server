const { DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define(
  "task",
  {
    description: {
      type: DataTypes.STRING,
    }
  },
  {}
);

module.exports = Task;