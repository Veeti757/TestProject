const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/',function(request,response){
response.send('Testi Pelaa!!');
});

app.listen(PORT,function(){
    console.log('Portti '+PORT);
});

module.exports = app;