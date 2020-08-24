const chalk = require("chalk");
const log = console.log;
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("./middleware/validate-session");
require("dotenv").config();

let user = require("./controllers/usercontroller");

const app = express();
const db = new Sequelize(
  "postgres://postgres:weewoo123@localhost:5432/hca_database"
);

/**********************************
 ********   ITEM MODEL   *********
 *********************************/
//commented out item stuff to focus on getting the user to work first

// const Item = db.define(
//   "Item",
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     rarity: {
//       type: DataTypes.INTEGER,
//     },
//     value: {
//       type: DataTypes.INTEGER,
//     },
//     itemId: {
//       type: DataTypes.INTEGER,
//     },
//     amountNeeded: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {}
// );

/**********************************
 ******** ITEM LIST MODEL *********
 *********************************/

// const ItemList = db.define(
//   "ItemList",
//   {
//     name: {
//       type: DataTypes.STRING,
//     },
//     owner: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {}
// );

// ItemList.hasMany(Item);
// Item.belongsTo(ItemList, {
//   foreignKey: {
//     name: "itemId",
//   },
// });

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Working, base route" });
});

// app.use(
//   "/item", // Item controller here
//   router.post("/create", /*validateSession,*/  (req, res) => {

// /**********************************
// ********   ITEM CREATE   *********
// *********************************/

//     const item = {
//       name: req.body.item.name,
//       description: req.body.item.description,
//       rarity: req.body.item.rarity,
//       type: req.body.item.type,
//       value: req.body.item.value,
//       itemId: req.body.item.itemId,
//       amountNeeded: req.body.item.amountNeeded,
//     };
//     Item.create(item)
//       .then((item) => res.status(200).json(item))
//       .catch((err) => res.status(500).json({ error: err }));
//   }),

// /**********************************
// ********  GET ALL ITEMS  **********
// ***********************************/

// router.get("/", (req, res) => {
//   Item.findAll()
//   .then(items => res.status(200).json(items))
//   .catch(err => res.status(500).json({ error: err}))
// })
// );

app.use("/user", user);

app.use(require("./middleware/validate-session"));

// Code down here is the startup procedure
// 1 - Check DB Authentication
// 2 - Verify all models in the DB
// 3 - run the express application

db.authenticate()
  .then(() => {
    log(chalk.greenBright("DB Auth Success"));
    return db.sync();
  })
  .then(() => {
    log(chalk.greenBright("DB Sync Success"));
    app.listen(3000, () => log("Server on 3000"));
  })
  .catch((err) => log(chalk.redBright(err)));
