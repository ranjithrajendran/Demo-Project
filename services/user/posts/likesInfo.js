"use strict";

const connection = require('../../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside likesInfo service");
        connection.query('SELECT likes,dislikes FROM posts WHERE postId= ?', [input.postId], (err, results) => {

            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                const data = {
                    likesInfo:results,
                    message:"likes Information of post",
                    status: 200
                }
                resolve(data);
            } else {
                reject(500);
            }
        });
    });
}