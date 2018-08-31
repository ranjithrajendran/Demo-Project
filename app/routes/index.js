"use strict";

const dbOperation = require('../controllers');

module.exports = (app) => {
    console.log("router index");
    app.get('/',(req, res) => {
        const data = {
            message: "Database Connected Successfully"
        }
        res.send(data);
    });
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.get('/users', dbOperation.getDetails);
    app.post('/users', dbOperation.createUser);
    app.put('/users', dbOperation.updateUser);
    app.delete('/users', dbOperation.deleteUser);
    app.post('/login', dbOperation.authenticateUser);
    app.put('/users/addFriends', dbOperation.addFriends);
    app.put('/users/removeFriends', dbOperation.removeFriends);
    app.get('/users/friendsList', dbOperation.friendsList);
};
