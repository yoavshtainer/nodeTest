
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");


var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var names = [];
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

console.log("start");
app.get("/", function(request, response){
	var content = fs.readFileSync("index.html");
	
		response.setHeader("Content-Type", "text/html");
		response.send(content);

});



// app.post("/", function(request, response){
//   	console.log("POST " + request.body.txtName);
// 	names.push( " " + request.body.txtName);
//   response.setHeader("Content-Type", "text/html");
//   response.send('Succeeded.');

// });

app.post("/", function(request, response){
  	console.log("POST " + request.body.message);
	names.push( " " + request.body.message);
  // response.setHeader("Content-Type", "text/html");
  response.send(request.body.message);

});


app.get("/api/actionName", function(request, response){
	// var name = names;
  	console.log("/api/actionName ");
    // response.setHeader("Content-Type", "text/html");
		console.log(names);

  response.send({names:names});

});
app.listen(port, host);
// var io = require('socket.io').listen(app);
