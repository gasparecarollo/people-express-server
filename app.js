const express = require('express');

const app = express();

const peopleController = require('./Controllers/peopleController');

app.use(express.json());

app.use("/people", peopleController)

app.get('/people', (res, request) => {
    response.send("Welcome to the People's Website!")
})

app.get('*', (res, request) => {
    response.status(404).send("Sorry, this page does not exist!")
})


module.exports = app;