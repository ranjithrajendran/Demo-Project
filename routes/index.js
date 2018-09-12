"use strict";

const userRouter = require('./user/user');
const loginRouter = require('./login');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (app) => {
    console.log("router index");
    app.get('/', (req, res) => {
        const data = {
            message: "Database Connected Successfully"
        }
        res.send(data);
    });

    app.use('/users', userRouter);
    app.use('/login', loginRouter);
};