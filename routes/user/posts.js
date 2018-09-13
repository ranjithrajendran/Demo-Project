"use strict";
var express = require('express')
var Router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../../controllers/user');
const connection = require('../../services/dbConnect');


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
}).single('file');



Router.post('/add', (req, res) => {
    upload(req, res, (err) => {
        const input = req.body;
        console.log(input);
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (req.file == undefined) {
                console.log('No file Selected');
            } 
                console.log('file uploading');
                const userId = input.userId;
                const content = input.content;
                var media;
                if(req.file == undefined){
                    media = 'no-file';
                }else{
                    media = `uploads/${req.file.filename}`;
                }
                
                connection.query('INSERT INTO posts (userId,content,media) VALUES (?,?,?)', [userId, content, media], (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send("INVALID CREDENTIALS");
                        return;
                    }
                    const data = {
                        userId: userId,
                        content: content,
                        file: media,
                        status: 200,
                        messege: "POST added Successfully"
                    }
                    console.log(data);
                    res.send(data);
                })
            
        }
    })

});
Router.post('/remove', userController.removePost);
Router.post('/list', userController.listPost);
Router.post('/like', userController.likePost);
Router.post('/dislike', userController.dislikePost);
Router.post('/likesInfo', userController.likesInfo);
module.exports = Router;