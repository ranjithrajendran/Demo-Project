"use strict";

const connection = require('../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Updation service");
        connection.query('UPDATE user SET ?=? where loginId=? and password=?', [input.loginId, input.password], (err, results) => {
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