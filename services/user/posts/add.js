"use strict";

const connection = require('../../dbConnect');

const addPost = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside adding posts service");
        console.log(input.media);
        connection.query('INSERT INTO posts (userId,content) values ?,?', [input.userId,input.content], (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                resolve(200);
            } else {
                reject(500);
            }
        });
    });
}
module.exports ={
    addPost
}