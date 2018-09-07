"use strict";

const connection = require('../../dbConnect');

const listPost = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside adding posts service");
        connection.query('SELECT * FROM posts WHERE userId=?', input.userId, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                resolve(results);
            } else {
                reject(500);
            }
        });
    });
}
module.exports ={
    listPost
}