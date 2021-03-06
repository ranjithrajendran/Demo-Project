"use strict";

const connection = require('../dbConnect');

module.exports = () => {
    return new Promise((resolve, reject) => {
        console.log("inside Display service");
        connection.query('SELECT userId,loginId,firstName,lastName,isLoggedIn FROM user', (err, results) => {
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