"use strict";

const connection = require('../../dbConnect');

const removeFriends = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Removing Friends service");
        console.log(input.loginId1 + ' ' + input.loginId2);
        connection.query('update user set friends = json_remove(friends,replace(json_search(friends,"one",?),\'"\',\'\')) where (json_search(friends,"one",?) is not null) AND (loginID= ?)', [input.loginId2, input.loginId2, input.loginId1]);
        connection.query('update user set friends = json_remove(friends,replace(json_search(friends,"one",?),\'"\',\'\')) where (json_search(friends,"one",?) is not null) AND (loginID= ?)', [input.loginId1, input.loginId1, input.loginId2], (err, results) => {
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
    removeFriends
}