const express = require('express');
const PORT = 3000;
const app = express();
const studentRouter = require('./routes/student');
const loginRouter = require('./routes/login');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

app.use(express.json());
dotenv.config;

app.get('/',function(request,response){
response.send('Testi Pelaa!!');
});


app.use('/login',loginRouter);
app.use(authenticateToken);
app.use('/student',studentRouter);



app.listen(PORT,function(){
    console.log('Portti '+PORT);
});

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return response.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return response.sendStatus(401);
    }

    jwt.verify(token, process.env.MY_SECRET, function(err, user) {
      if (err) {
        return response.sendStatus(403);
      }
      request.user = user;
      next();
    })
  }

module.exports = app;