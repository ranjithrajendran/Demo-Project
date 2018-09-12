"use strict";
var express = require('express')
var Router = express.Router();
const loginController = require('../controllers/login');

Router.post('/', loginController.authenticateUser);

module.exports = Router;