"use strict";
var express = require('express')
var Router = express.Router();
const userController = require('../controllers/userController');

Router.get('/', userController.getDetails);
Router.post('/', userController.createUser);
Router.put('/', userController.updateUser);
Router.delete('/', userController.deleteUser);
Router.put('/friends/add', userController.addFriends);
Router.put('/friends/remove', userController.removeFriends);
Router.post('/friends/list', userController.friendsList);
Router.post('/post/add', userController.addPost);

module.exports = Router;
