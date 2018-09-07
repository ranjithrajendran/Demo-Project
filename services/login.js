"use strict";

const connection = require('./dbConnect');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const authenticate = (input) => {
    return new Promise((resolve, reject) => {
        console.log("inside Authentication service");
        connection.query('SELECT * FROM user WHERE loginId=? AND password=?', [input.loginId, input.password], (err, results) => {
            if (err) {
                console.log(err);
                reject(400);
            }
            if (results) {
                // PAYLOAD
                var payload = {
                    loginId:input.loginId,
                    password:input.password
                };

                // PRIVATE and PUBLIC key
                var privateKEY = fs.readFileSync(__dirname+'/private.key', 'utf8');

                var i = 'FaceBook Demo'; // Issuer 
                var s = 'some@user.com'; // Subject 
                var a = 'http://FaceBookDemo.in'; // Audience

                // SIGNING OPTIONS
                var signOptions = {
                    issuer: i,
                    subject: s,
                    audience: a,
                    expiresIn: 1000,
                    algorithm: "RS256"
                };
                var token = jwt.sign(payload, privateKEY, signOptions);
                console.log("Token - " + token)
                var result ={
                    results: results,
                    token: token,
                    status:200,
                    message:"User Log-In Successful"
                }
                resolve(result);
            } else {
                reject(500);
            }
        });
    });
}

module.exports = {
    authenticate
}