
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

app.post("/", function(request, response){
  	console.log("POST " + request.body.txtName);
	names.push( " " + request.body.txtName);
  response.setHeader("Content-Type", "text/html");
  response.send('Succeeded.');

});


app.get("/api/actionName", function(request, response){
  	console.log("/api/actionName ");
    response.setHeader("Content-Type", "text/html");
  response.send('Entered names are: ' +  names + ".");

});
app.listen(port, host);
