"use strict";

var Joi = require('joi');
console.log("inside validator");
module.exports = {
body: {
    loginId: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.required(),
    gender: Joi.string().max(6).required()
}
};