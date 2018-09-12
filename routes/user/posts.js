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
        fileSize: 3000000
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
                res.send({
                    msg: 'No file Selected'
                });
            } else {
                console.log('file uploaded');
                const userId = input.userId;
                const content = input.content;
                const media = `uploads/${req.file.filename}`;
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
                    res.send(data);
                })
            }
        }
    })

});
Router.post('/remove', userController.removePost);
Router.post('/list', userController.listPost);

module.exports = Router;