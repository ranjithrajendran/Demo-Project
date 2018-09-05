"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/");
const db = require("./services/dbConnect");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
db.connect( (err) =>{
    if (err) {
        console.log('db connection error');
    } else {
        console.log('db connection success');
    }
});
const server = app.listen(5000, () => {
    console.log("app running on port.", server.address().port);
});
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
    next();
})
routes(app);
