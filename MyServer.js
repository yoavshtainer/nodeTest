
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
 var count;
var db = require("./Sensor.dal");
console.log(db.sensor.colName);
// db.sensor.add(dBase,"sensors");


app.get("/", function(request, response){
	var content = fs.readFileSync("index.html");
	
		response.setHeader("Content-Type", "text/html");
		response.send(content);

});
// setTimeout(doSomething, 10);
  count = db.sensor.getLength(dBase,"sensors");

app.post("/", function(request, response){
  	console.log("POST " + request.body.message.id + " " + request.body.message.name);
		dBase.id = request.body.message.id;
		db.sensor.getsensorByName(request.body.message.id,"sensors");
		if(dBase.id === request.body.message.id){
			console.log("exist");
			dBase.status != dBase.status;
		} else{
			console.log("not exist");
			dBase.status = false;
		}

		db.sensor.add(dBase,"sensors");

  // response.setHeader("Content-Type", "text/html");
  response.send(request.body.message);

});


app.get("/api/actionName", function(request, response){

  	console.log("/api/actionName ");

	var message =	db.sensor.getsensorByName(count,"sensors");
	// 	db.collection("user", function(error, collection){
	// 		// collection.findOne({id:"1"}, function(error, user){
	// 		// 								console.log("user is: ", user);

	// 		// 			});
	// 	collection.find({}).toArray().then( function(users){
	// 				if(users.length == 0){
	// 						console.log("no user");
	// 				}else{
	// 						console.log("found user", message = user[0]);
	// 				}
	// 		})

	// });

  response.send({message:message});

});
app.listen(port, host);
// var io = require('socket.io').listen(app);
