const { DataTypes } = require("sequelize");
const db = require("../db");

const ListModel = db.define(
  "list",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {}
);

module.exports = ListModel;
