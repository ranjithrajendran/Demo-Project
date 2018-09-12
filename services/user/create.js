"use strict";

const connection = require('../dbConnect');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside insertion service");
        connection.query('INSERT INTO user SET ?', input, (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                var payload = {
                    loginId: input.loginId,
                    password: input.password
                }
                var privateKEY = fs.readFileSync(__dirname + '/private.key', 'utf8');

                var i = 'FaceBook Demo'; // Issuer 
                var s = 'some@user.com'; // Subject 
                var a = 'http://FaceBookDemo.in'; // Audience

                // SIGNING OPTIONS
                var signOptions = {
                    issuer: i,
                    subject: s,
                    audience: a,
                    expiresIn: 10000,
                    algorithm: "RS256"
                };
                var token = jwt.sign(payload, privateKEY, signOptions);
                connection.query('UPDATE user SET token=? where loginId=?', [token.sign, input.loginId]);
                connection.query('UPDATE user SET friends = "[]" where loginId=?', input.loginId);
                var result = {

                    token: token,
                    status: 200,
                    message: "New User Created Successfully"
                }
                resolve(result);
            } else {
                reject(500);
            }
        });
    });
}