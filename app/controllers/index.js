"use strict";

const dbService = require('../services/dbOperations');

console.log("inside controller");

const getDetails = (req,res) => {
    console.log("inside get details controller");
    dbService.display().then((data) => {
        res.send(data);
    }).catch((err) =>{res.send(err)});
}

const createUser = (req,res) => {
    console.log("inside Create User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.create(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

const updateUser = (req,res) => {
    console.log("inside Update User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.update(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

const deleteUser = (req,res) => {
    console.log("inside Delete User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.remove(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

const authenticateUser = (req,res) => {
    console.log("inside Authenticate User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.authenticate(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

const addFriends = (req,res) => {
    console.log("inside Add Friends controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.addFriends(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

const removeFriends = (req,res) => {
    console.log("inside Remove Friends controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.removeFriends(input).then(function (data) {
        res.send(data);
    }).catch((error)=>{res.send(error)});
}

module.exports = {
    getDetails,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    addFriends,
    removeFriends
}