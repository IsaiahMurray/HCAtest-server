const { DataTypes } = require("sequelize");
const db = require("../db");

const TaskModel = db.define(
  "task",
  {
    description: {
      type: DataTypes.STRING,
    }
  },
  {}
);

module.exports = TaskModel;