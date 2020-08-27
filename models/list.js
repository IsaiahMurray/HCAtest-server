const { DataTypes } = require("sequelize");
const db = require("../db");

const List = db.define(
  "list",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {}
);

module.exports = List;
