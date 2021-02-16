require('dotenv').config();
const chalk = require("chalk");
const log = console.log;

const express = require('express');
const app = express();

const database = require('./db');
const controllers = require('./controllers');
const middlewares = require('./middleware');

app.use(express.json());

app.use('/user', controllers.User);

//Controller routes
app.use('/list', middlewares.ValidateSession, controllers.List);
app.use('/task', middlewares.ValidateSession, controllers.Task);

//Satartup
database.authenticate()
.then(() => database.sync())
.then(app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
}))
.catch((e) => {
console.log('[server]: Server yeeted.. weewoo..', e)
});

app.use(middlewares.Headers);