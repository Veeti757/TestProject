const express = require('express');
const PORT = 3000;
const app = express();
const studentRouter = require('./routes/student');
const loginRouter = require('./routes/login');

app.use(express.json());

app.get('/',function(request,response){
response.send('Testi Pelaa!!');
});


app.use('/login',loginRouter);
app.use('/student',studentRouter);



app.listen(PORT,function(){
    console.log('Portti '+PORT);
});

module.exports = app;