const express         = require('express');
const bodyParser      = require('body-parser');
const path            = require('path');

//Declaring the routes
const api             = require('./server/routes/api');

const port            = 3000;

const app             = express();

app.use(express.static(path.join(__dirname , 'dist/GoBlog')));

//Parses the text as URL encoded data and JSON type object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Using the api module for /api requests
app.use('/api',api);

//For any other requests from the browser
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'dist/GoBlog/index.html'));
});

app.listen(port, () => {
    console.log("Server running on localhost port: " + port);
});
