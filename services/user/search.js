"use strict";

const connection = require('../dbConnect');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside User Search service");
        connection.query('SELECT firstName,lastName FROM user WHERE firstName LIKE ?"%"', input.key, (err, results) => {
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