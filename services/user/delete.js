"use strict";

const connection = require('../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Deletion service");
        connection.query('DELETE FROM user WHERE loginId=? AND password=?', [input.loginId, input.password], (err, results) => {
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