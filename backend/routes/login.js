const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const student = require('../models/student_model');
const bcrypt = require('bcryptjs');
const router = express.Router();
dotenv.config();

router.post('/',function(request, response){
    if(request.body.username && request.body.password){
        const username = request.body.username;
        const password = request.body.password;
        student.check_login(username, function(err, result){
            if(err){
                return response.status(500).json({"error":"palvelinvirhe"});
            }
            else{
                if(result.length > 0){
                    bcrypt.compare(password,result[0].password, function(bcError,bcResult){
                        if(bcError){
                            return response.status(500).json({"error":"palvelinvirhe"});
                        }
                        else if(bcResult){
                            const token = generateToken(username,result[0].role);
                            return response.status(200).json(token);
                        }
                        else{
                            console.log("salasana tai tunnus puuttuu");
                            return response.status(401).json({"error":"tunnus ja salasana eivät täsmää"});
                        }
                    });
                }
                else{
                    console.log("tunnusta ei ole tietokannassa");
                    return response.status(401).json({"error":"tunnus ja salasana eivät täsmää"});
                }
            }
        });
    }
    else{
        console.log('salasana tai tunnus puuttuu');
        response.status(400).json({"message":"tunnus ja salasana eivät täsmää"});
    }
});

function generateToken(username,role){
    return jwt.sign({username,role}, process.env.MY_SECRET,{"expiresIn":"1800s"});
}

module.exports = router;