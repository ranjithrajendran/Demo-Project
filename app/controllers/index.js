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
    dbService.create(input).then((data) => {
        res.status(200).send("New User Created Successfully");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("Username Already Taken");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const updateUser = (req,res) => {
    console.log("inside Update User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.update(input).then((data) => {
        res.status(200).send("User Details Updated Successfully");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("invalid Username or password"); 
            console.log("invalid username or password");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const deleteUser = (req,res) => {
    console.log("inside Delete User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.remove(input).then((data) => {
        res.status(200).send("User Deleted Successfully");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const authenticateUser = (req,res) => {
    console.log("inside Authenticate User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.authenticate(input).then((data) => {
        if(data[0] == null){
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password []");
        }
        res.status(200).send("User Log-In Successful");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("invalid Username or password"); 
            console.log("invalid username or password");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const addFriends = (req,res) => {
    console.log("inside Add Friends controller");
    // const input = req.body;
    const input = req.query;
    console.log(input);
    dbService.addFriends(input).then((data) => {
        res.status(200).send("Friend Added Successfully");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("Unable To Add Friend");
            console.log("Unable To Add Friend");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const removeFriends = (req,res) => {
    console.log("inside Remove Friends controller");
    // const input = req.body;
    const input = req.query;
    console.log(input);
    dbService.removeFriends(input).then((data) => {
        res.status(200).send("Friend Removed Successfully");   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("Unable To Remove Friend");
            console.log("Unable To Remove Friend");
        }
        else{
            res.sendStatus(500);
        }
    });
}

const friendsList = (req,res) => {
    console.log("inside Show Friends controller");
    // const input = req.body;
    const input = req.query;
    console.log(input);
    dbService.friendsList(input).then((data) => {
        res.send(data[0].friends);   
    }).catch((error)=>{
        if(error==400){
            res.status(400).send("invalid Username or password");
            console.log("invalid Username or password");
        }
        else{
            res.sendStatus(500);
        }
    });
}

module.exports = {
    getDetails,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    addFriends,
    removeFriends,
    friendsList
}