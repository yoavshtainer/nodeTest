
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var mongo = require("mongodb");

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var names = [];
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

console.log("start");

var db = new mongo.Db("nodejs-introduction", new mongo.Server(host, port, {}));

db.open(function(error){
	console.log("We are connected! " + host + ":" + port);
	
	// db.collection("tweet", function(error, collection){
	// 	tweetCollection = collection;
	// });

})

app.get("/", function(request, response){
	var content = fs.readFileSync("index.html");
	
		response.setHeader("Content-Type", "text/html");
		response.send(content);

});

var dBase = {
	id : 0,
	name: '',
	status: false
}

app.post("/", function(request, response){
  	console.log("POST " + request.body.message.id + " " + request.body.message.name);
	// names.push( " " + request.body.message);
	db.collection("user", function(error, collection){
		console.log("We have the collection");
	collection.findOne({id:request.body.message.id}, function(error, user){
										if(!error){
											console.log("user is: ", user);
											dBase.status = !user.status;
										}	else{
												console.log("there is no user with this id." );
												dBase.status = true;
											}
						});

	console.log("status " + dBase.status);
	collection.insert({
			id: request.body.message.id,
			name: request.body.message.name,
			status: dBase.status
		}, function(){
			console.log("Successfully inserted " + request.body.message.name);
		});
	});
  // response.setHeader("Content-Type", "text/html");
  response.send(request.body.message);

});


app.get("/api/actionName", function(request, response){

  	console.log("/api/actionName ");

		var message = dBase;
		db.collection("user", function(error, collection){
			// collection.findOne({id:"1"}, function(error, user){
			// 								console.log("user is: ", user);

			// 			});
		collection.find({}).toArray().then( function(users){
					if(users.length == 0){
							console.log("no user");
					}else{
							console.log("found user", message = user[0]);
					}
			})

	});

  response.send({message:message});

});
app.listen(port, host);
// var io = require('socket.io').listen(app);
