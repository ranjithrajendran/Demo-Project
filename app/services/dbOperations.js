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
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
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
                reject(err);
            }
            if (results) {
                var response = {
                    messege: "inserted successfully"
                }
                connection.query('UPDATE user SET friends = "[]" where loginId=?',input.loginId);
                resolve(response);
            } else {
                reject();
            }
        });
    });
}

function update(input) {
    return new Promise((resolve, reject) => {
        console.log("inside Update service");
        connection.query('UPDATE testing SET name=? where slno=?', [input.name, input.slno], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
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
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
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
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
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
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
            }
        });
    });
}

const removeFriends = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Remove Friends service");
        console.log(input.loginId1 + ' ' + input.loginId2);
        connection.query(sqlstatement, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (results) {
                resolve(results);
            } else {
                reject();
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
    removeFriends
}