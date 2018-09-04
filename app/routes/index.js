"use strict";

const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');

module.exports = (app) => {
    console.log("router index");
    app.get('/', (req, res) => {
        const data = {
            message: "Database Connected Successfully"
        }
        res.send(data);
    });
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use('/users', userRouter);
    app.use('/login', loginRouter);
};
