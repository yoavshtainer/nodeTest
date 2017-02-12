
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var log = require('minilog')('MyServer');
// var mongo = require("mongodb");

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

console.log("start");

var dBase = {
	id : 0,
	name: '',
	status: false
};

var db = require("./Sensor.dal");
// Mongo.connect();
console.log(db.sensor.colName);



app.get("/", function(request, response){
	var content = fs.readFileSync("index.html");
	
		response.setHeader("Content-Type", "text/html");
		response.send(content);

});
// setTimeout(doSomething, 10);
 var count = db.sensor.connect(dBase,"sensors");
app.post("/", function(request, response){
  	console.log("POST " + request.body.message.id + " " + request.body.message.name);
// var DBase = dBase;
		var DBase = db.sensor.getsensorByid(request.body.message.id,"sensors");
		if(DBase.id === request.body.message.id){
			console.log("exist");
			DBase.status != dBase.status;
				db.sensor.update(DBase,"sensors");
		} else{
			console.log("not exist");
			DBase.name = request.body.message.name;
			DBase.status = false;
			db.sensor.add(DBase,"sensors");
		}

		

  // response.setHeader("Content-Type", "text/html");
  response.send(request.body.message);

});


app.get("/api/actionName/:id", function(request, response){

  	console.log("/api/actionName " + request.params.id);

	db.sensor.getsensorByid(request.params.id,"sensors").then(function(message){
		
	console.log("message: " + message);
  console.log("message: " + message.id);
  response.send(request.params.id);
	}, function(err){
		console.log("get err message: " + err);
	});	
});
app.listen(port, host);
// var io = require('socket.io').listen(app);
