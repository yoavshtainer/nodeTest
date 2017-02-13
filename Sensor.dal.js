var connectors = require('./connectIndex');
var Mongo = connectors.Mongo;
var log = require('minilog')('sensor.dal');

log.info('is connected', Mongo.isConnected);

class sensor {
  static get colName() {
    return 'sensors';
  }

  static connect(sensors, collectionName = 'sensors'){
    Mongo.connect().then(function() {
    var col = Mongo.collection(collectionName);
    return sensor.getLength(sensor, collectionName = 'sensors');
    });
    
  }
  static add(sensors, collectionName = 'sensors') {
    var col = Mongo.collection(collectionName);
    col.insert(sensors, function(){
			console.log("Successfully inserted " + sensors.name);
		});
  }

  static addOne(sensor, collectionName = 'sensors') {
    var col = Mongo.collection(collectionName);
    col.insertOne(sensor);
  }

  static getsensorByid(sensorid, collectionName = 'sensors') {
    var col = Mongo.collection(collectionName);
    
  return  col.findOne({id : sensorid.toString()});
  // .then(function(user){
  //             console.log("user is: ", user);
  //             console.log("user is: ", user.id);
  //             console.log("user is: ", user.name);
  //             // return user;
  //           },function(error){
  //             console.log("error is: ", error);
  //             // return 0;
  //           });  
  }

  static updatesensor(sensor, collectionName = 'sensors') {
    var col = Mongo.collection(collectionName);
    var negtiveStatus = !sensor.status;
    return col.update(
      {"_id": sensor._id},
      {
        $set: {
          status: negtiveStatus
        }
      }
    );
    // return col.updateOne(
    //   { key: sensor.key },
    //   {
    //     $set: sensor,
    //     $currentDate: {
    //       dateUpdated: true,
    //     },
    //     $setOnInsert: {
    //       dateAdded: new Date(),
    //     },
    //   },
    //   { returnOriginal: false, upsert: true }
    // )
    // .then((r) => r.value);
  }

 static getLength(sensor, collectionName = 'sensors') {
  var col = Mongo.collection(collectionName);
  var count;
  col.find({}).toArray().then( function(users){
    count = users.length;
					if(users.length == 0){         
							console.log("no user");
              sensor.add(sensor,"sensors");
					}else{
							console.log("found "+ (users.length) +" users" );  
              var count = 0;
              users.forEach(function(element) {
                  console.log("element number: " + count + " id: " + element.id);
                  console.log("name: "+ element.name);
                  console.log("status: "+ element.status);
                  count++;
              });         
					}
          console.log(count);
  return count;
			})
}

static getBuildingByName(buildingName, collectionName = 'sensors') {
    var col = Mongo.collection(collectionName);
    return col.findOne({ name: buildingName });
  }

}


module.exports.sensor = sensor;
