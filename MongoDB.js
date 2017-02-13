var MongoClient = require('mongodb').MongoClient;
var log = require('minilog')('MongoDB');

module.exports.MongoDB = class MongoDB {
  // static get connection(){
  //
  // };

  constructor() {
    console.log("start mongo");
    if (MongoDB.connection === undefined) {
      MongoDB.connection = null;
    }
  }

  static get isConnected() {
    return !!MongoDB.connection;
  }

  connect() {
    if (!process.env.MONGO_URL) {
      throw new Error(`Environment variable MONGO_URL is missing.`);
    }
    else{
      console.log(process.env.MONGO_URL);
    }

    log.info('connecting to dburl : ', process.env.MONGO_URL);

    MongoDB.connectionPromise = MongoClient.connect(process.env.MONGO_URL);
// console.log(MongoDB.connectionPromise);
    // return Promise.resolve(new MongoDB());
    return MongoDB.connectionPromise.then((db) => {
      console.log('[MongoDb] connected.');
      MongoDB.connection = db;

      return;
    })
    .catch((err) => {
        console.error('Problems with the connection to the database.');
        console.error(err.stack || err);
        process.exit(1);
        return;
    });
  }

  collection(name) {
    if (!MongoDB.isConnected) {
      throw new Error(
        `collection '${name}' could not be accessed because MongoDB was not connected.`
      );
    }

    return MongoDB.connection.collection(name);
  }

  static close() {
    return MongoDB.connection && MongoDB.connection.close();
  }
};
