"use strict"

const connection = require('./dbConnect');
const jwt = require('jsonwebtoken');

console.log("inside Database services");

const display = () => {
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

const create = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside insertion service");
        connection.query('INSERT INTO user   SET ?', input, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                var token = jwt.sign({
                    username: input.loginId,
                    password: input.password
                }, 'EnCrYpTiOn');
                console.log(token);
                connection.query('UPDATE user SET token=? where loginId=?', [token.sign, input.loginId]);
                connection.query('UPDATE user SET friends = "[]" where loginId=?', input.loginId);
                var result = {
                    "token": token,
                    "status": 200,
                    "message": "New User Created Successfully"
                }
                resolve(result);
            } else {
                reject(500);
            }
        });
    });
}

const update = (input) => {
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

const remove = (input) => {
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

const friendsList = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Friends List Display service");
        connection.query('SELECT friends FROM user WHERE loginId=? AND password=?', [input.loginId, input.password], (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                console.log(results[0].friends[1])
                resolve(results);
            } else {
                reject(500);
            }
        });
    });
}

const addPost = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside adding posts service");
        connection.query('INSERT INTO posts SET ?', input, (err, results) => {
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


module.exports = {
    display,
    create,
    update,
    remove,
    addFriends,
    removeFriends,
    friendsList,
    addPost
}
