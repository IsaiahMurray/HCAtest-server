const chalk = require("chalk");
const log = console.log;
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const db = new Sequelize(
  "postgres://postgres:weewoo123@localhost:5432/hca_database"
);

// let user = require('./controllers/usercontroller');
//---------------USER MODEL-----------------
const User = db.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {}
);

const Item = db.define(
  "Item",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    rarity: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.INTEGER
    },
    itemId: {
      type: DataTypes.INTEGER
    }
  },
  {}
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Working, base route" });
});

app.use(
  "/user", // User controller here

  /**********************************
   ********   USER CREATE   *********
   *********************************/

  router.post("/create", function (req, res) {
    User.create({
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13),
    })
      .then(function createSuccess(user) {
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        res.json({
          user: user,
          message: "User successfully created!",
          sessionToken: token,
        });
      })
      .catch((err) => log(chalk.redBright(err)));
    //--------------------------------------
  }),
  /**********************************
   ********   USER LOGIN   *********
   *********************************/

  router.post("/login", function (req, res) {
    User.findOne({
      where: {
        email: req.body.user.email,
      },
    })
      .then(function loginSuccess(user) {
        if (user) {
          bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id},
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 })

                res.status(200).json({
                  user: user,
                  message: "User has been logged in!",
                  sessionToken: token
              })
            } else {
              res.status(502).send({ error: "Login failed!! Who are you?!" });
            }
          });
        } else {
          res.status(500).json({ error: "User does not exist." });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  })
);

app.use("/item")
 
app.use(require('./middleware/validate-session'));

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
