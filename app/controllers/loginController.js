"use strict";

const dbService = require('../services/dbOperations');

console.log("inside controller");

const authenticateUser = (req, res) => {
    console.log("inside Authenticate User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.authenticate(input).then((data) => {
        if (data[0] == null) {
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password []");
        }
        res.status(200).send("User Log-In Successful");
        console.log("User Log-In Successful");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password");
        } else {
            res.sendStatus(500);
        }
    });
}

module.exports = {
    authenticateUser
}
