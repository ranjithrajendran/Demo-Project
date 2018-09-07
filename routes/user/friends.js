"use strict";
var express = require('express')
var Router = express.Router();
const userController = require('../../controllers/user');

Router.put('/add', userController.addFriends);
Router.put('/remove', userController.removeFriends);
Router.post('/list', userController.friendsList);

module.exports = Router;