require("dotenv").config();
const chalk = require("chalk");

const Express = require("express");
const app = Express();
app.use(Express.json());

const database = require("./db");
const middlewares = require("./middleware");
const controllers = require("./controllers");

app.use(Express.json());

//Controller routes
app.use("/user", controllers.User);
app.use("/list", middlewares.ValidateSession, controllers.List);
app.use("/task", middlewares.ValidateSession, controllers.Task);

//Satartup
database
  .authenticate()
  .then(() => {
    console.log(chalk.greenBright("DB AUTHENTICATED"));
    database.sync();
    console.log(chalk.cyanBright("DB SYNCED"));
  }) // => {force: true}
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        chalk.yellowBright(
          `[Server: ] App is listening on Port ${process.env.PORT}`
        )
      );
      //   console.log(`[Server: ] App is listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(chalk.redBright("[Server: ] Server Yeeted"));
    console.error(chalk.redBright(err));
    // console.log("[Server: ] Server Crashed");
    // console.error(err);
  });

app.use(middlewares.Headers);