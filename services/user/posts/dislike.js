"use strict";

const connection = require('../../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Like Post service");
        // connection.query('SELECT * FROM posts WHERE userId=? AND userId IN(SELECT userId FROM user WHERE loginId In(ARRAY_TO_STRING(SELECT friends FROM user WHERE userId=?)) ORDER BY postId DESC', [input.userId, input.userId], (err, results) => {
            connection.query('UPDATE posts SET dislikes = dislikes+1 WHERE postId= ?', [input.postId], (err, results) => {

            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                const data = {
                    message:"You liked The Post",
                    status: 200
                }
                resolve(data);
            } else {
                reject(500);
            }
        });
    });
}