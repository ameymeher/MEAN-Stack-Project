var express 	= require('express');
var app 		= express();
var port 		= process.env.PORT || 8888;
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser	= require('body-parser');
var router 		= express.Router();
var appRoutes 	= require('./app/routes/api')(router);
var path        = require('path');

app.use(bodyParser.json()); //for parsing application json
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended : true }));
app.use(express.static(__dirname + '/public'));										//Gives frontend access to all other files
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/MEANStackProject', function(err) {
	if (err) {
		console.log('Not connected to the database: ' + err);	
	}
	else{
		console.log('Connected to the database');
	}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function(){
	console.log('Running the server port: ' + port);
});