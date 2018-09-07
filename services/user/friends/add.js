"use strict";

const connection = require('../../dbConnect');

const addFriends = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Adding Friends service");
        console.log(input.loginId1 + ' ' + input.loginId2);
        connection.query('UPDATE user SET friends = (CASE WHEN loginId=? THEN (JSON_ARRAY_APPEND(friends,"$",?))WHEN loginId=? THEN (JSON_ARRAY_APPEND(friends,"$",?))END) WHERE loginId IN(?,?)', [input.loginId2, input.loginId1, input.loginId1, input.loginId2, input.loginId2, input.loginId1], (err, results) => {
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
module.exports ={
    addFriends
}