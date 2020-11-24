const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');

var url = "mongodb://localhost:27017";
const dbName = 'questionsDB';

const client = new MongoClient(url,{useUnifiedTopology:true});

//Cache the mongodb connection
var dbCache = {};
client.connect(function(err) {
    dbCache.db = client.db(dbName);
    console.log("Database Connected successfully to server => " + dbName);
});

module.exports.getDb = function() {
    return dbCache.db;
}

module.exports.getMongodb = function() {
    return mongodb;    
}

module.exports.ObjectID = mongodb.ObjectID;

