"use strict";
var express = require('express')
var Router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../../controllers/user');


const storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename: (req,file,cb)=>{
        cb(null, file.fieldname+ '-' + Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    limits: {fileSize:3000000},
}).single('file');



Router.post('/add',(req,res) =>{
    upload(req,res,(err) =>  {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            if(req.file == undefined){
                console.log('No file Selected');
                res.send({msg:'No file Selected'});
            } else{
                console.log('file upload');
                const data = {
                    msg:"file uploaded",
                    file: `uploads/${req.file.filename}`
                }
                res.send(data);
            }
        }
    })

});
Router.post('/remove', userController.removePost);
Router.post('/list', userController.listPost);

module.exports = Router;