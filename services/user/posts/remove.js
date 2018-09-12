"use strict";

const connection = require('../../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside adding posts service");
        connection.query('DELETE FROM posts WHERE postId=?', input.postId, (err, results) => {
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