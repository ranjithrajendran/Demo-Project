"use strict";

const connection = require('../dbConnect');

const userInfo = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside userinfo service");
        connection.query('SELECT userId,loginId,firstName,lastName,dob,gender FROM user WHERE loginId=?', input.loginId, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                console.log(results);
                resolve(results);
            } else {
                reject(500);
            }
        });
    });
}

module.exports ={
    userInfo
}