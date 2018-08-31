"use strict"
"use strict"
const connection = require('./dbConnect');

console.log("inside Database services");

const display = () => {
    return new Promise((resolve, reject) => {
        console.log("inside Display servise");
        connection.query('SELECT * FROM user', (err, results) => {
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

const create = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Display service");
        connection.query('INSERT INTO user   SET ?', input, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                connection.query('UPDATE user SET friends = "[]" where loginId=?',input.loginId);
                resolve(200);
            } else {
                reject(500);
            }
        });
    });
}

function update(input) {
    return new Promise((resolve, reject) => {
        console.log("inside Update service");
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

const authenticate = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Authentication service");
        connection.query('SELECT * FROM user WHERE loginId=? AND password=?', [input.loginId, input.password], (err, results) => {
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

const addFriends = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Add Friends service");
        console.log(input.loginId1 + ' ' + input.loginId2);
        connection.query('UPDATE user SET friends = (CASE WHEN loginId=? THEN (JSON_ARRAY_APPEND(friends,"$",?))WHEN loginId=? THEN (JSON_ARRAY_APPEND(friends,"$",?))END) WHERE loginId IN(?,?)', [input.loginId2, input.loginId1,input.loginId1, input.loginId2,input.loginId2, input.loginId1], (err, results) => {
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
        console.log("inside Remove Friends service");
        console.log(input.loginId1 + ' ' + input.loginId2);
        connection.query('update user set friends = json_remove(friends,replace(json_search(friends,"one",?),\'"\',\'\')) where (json_search(friends,"one",?) is not null) AND (loginID= ?)',[input.loginId2,input.loginId2,input.loginId1]);
        connection.query('update user set friends = json_remove(friends,replace(json_search(friends,"one",?),\'"\',\'\')) where (json_search(friends,"one",?) is not null) AND (loginID= ?)',[input.loginId1,input.loginId1,input.loginId2], (err, results) => {
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
                resolve(results);
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
    authenticate,
    addFriends,
    removeFriends,
    friendsList
}