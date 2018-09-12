"use strict";

const connection = require('../../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Post List service");
        connection.query('SELECT * FROM posts WHERE userId=? OR userId IN (SELECT userId FROM user WHERE loginId IN(SELECT friends FROM user WHERE userId= ?))', [input.userId, input.userId], (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                const data = {
                    posts: results,
                    status: 200,
                }
                resolve(data);
            } else {
                reject(500);
            }
        });
    });
}