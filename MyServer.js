
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

var db = require("./Sensor.dal").sensor;
// Mongo.connect();
console.log(db.colName);



app.get("/", function(request, response){
	var content = fs.readFileSync("index.html");
	
		response.setHeader("Content-Type", "text/html");
		response.send(content);

});
// setTimeout(doSomething, 10);
 var count = db.connect(dBase,"sensors");
app.post("/", function(request, response){
  	console.log("POST id: " + request.body.message.id + " name: " + request.body.message.name + " area: " + request.body.message.area);

var data = db.getsensorByid(request.body.message.id,"sensors");
		data.then(function(sensor){
			console.log("sensor is: ", sensor);
			if(sensor === null) {
						console.log("not exist");
						var Data = request.body.message;
						db.add(Data,"sensors");
			} else {
						console.log("exist");
						sensor.status != sensor.status;
						db.updatesensor(sensor,"sensors");
      }
							
			response.send(request.body.message);
		},function(error){
			console.log("error is: ", error);
			response.send(error);
		});

						// response.send(request.body.message);
});


app.get("/api/actionName/:id", function(request, response){

  	console.log("/api/actionName " + request.params.id);
	
		var data = db.getsensorByid(request.params.id,"sensors");
		data.then(function(sensor){
              console.log("sensor is: ", sensor);
							response.send(sensor);
              // return sensor;
            },function(error){
              console.log("error is: ", error);
							response.send(error);
              // return 0;
            });
		
 
  
});
app.listen(port, host);
// var io = require('socket.io').listen(app);
