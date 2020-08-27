const chalk = require("chalk");
const log = console.log;

const express = require('express');
const app = express();

const database = require('./db');
const controllers = require('./controllers');
const middlewares = require('./middleware');

app.use(express.json());

app.use('/user', controllers.User);
//middlewares.ValidateSession

//Controller routes
app.use('/list', middlewares.ValidateSession, controllers.List);
app.use('/task', middlewares.ValidateSession, controllers.Task);

//Satartup
database.authenticate()
.then(() => database.sync())
.then(app.listen(3000, () => {
    console.log('Listening on 3000');
}))
.catch((e) => {
console.log('[server]: Server yeeted.. weewoo..')
})