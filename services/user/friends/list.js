"use strict";

const connection = require('../../dbConnect');

const friendsList = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Friends List Display service");
        connection.query('SELECT friends FROM user WHERE loginId=?', input.loginId, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                console.log(results)
                resolve(results);
            } else {
                reject(500);
            }
        });
    });
}
module.exports ={
    friendsList
}