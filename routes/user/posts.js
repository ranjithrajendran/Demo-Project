"use strict";
var express = require('express')
var Router = express.Router();
const userController = require('../../controllers/user');

Router.post('/add', userController.addPost);
Router.post('/remove', userController.removePost);
Router.post('/list', userController.listPost);

module.exports = Router;