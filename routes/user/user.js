"use strict";
var express = require('express')
var Router = express.Router();
const userController = require('../../controllers/user');
const friendsRouter = require('./friends');
const postsRouter = require('./posts');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var validate = require('express-validation');
var validation = require('../../validators/signup');

Router.post('/create',validate(validation),userController.createUser);
Router.use('/', (req,res,next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    var publicKEY = fs.readFileSync(__dirname+'/public.key', 'utf8');

    var i = 'FaceBook Demo';  
    var s = 'some@user.com';
    var a = 'http://FaceBookDemo.in';
    var verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: 10000,
        algorithm: "RS256"
    };
    
    jwt.verify(String(token), publicKEY, verifyOptions,(error,decoded) => {
        if(error){
            console.log(error);
            res.status(400).send("invalid token");
            return;
        }
        else if(decoded.name == null){
            console.log("\nJWT verification result: " + JSON.stringify(decoded));
            next();
        }
        else{
            res.status(400).send("invalid token");
            return;
        }
    });
});
Router.post('/token', (req,res) => {
    var data ={
        message:"token verified"
    }
    res.send(data)
});
Router.post('/info', userController.userInfo);
Router.get('/list', userController.getDetails);
Router.put('/update', userController.updateUser);
Router.delete('/delete', userController.deleteUser);
Router.use('/friends',friendsRouter);
Router.use('/post',postsRouter);

module.exports = Router;