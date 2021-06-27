exports.myinsert=(insertDBName,insertCollectionName,insertData)=>{
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = insertDBName;
// Create a new MongoClient
const client = new MongoClient(url);
// Use connect method to connect to the Server
client.connect(function(err) {
  //assert.equal(null, err);
  if(err) console.log('Connect fail')
  else console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection(insertCollectionName);
  // Insert some documents
  collection.insertMany(insertData, function(err, result) {
    if(err) console.log("Inserte fail")
    else console.log("Inserted 3 documents into the collection");
    callback(result);
    client.close();
  });
  //client.close();
});
}

exports.myfind=(insertDBName,insertCollectionName,findData,callback)=>{
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = insertDBName;
    // Create a new MongoClient
    const client = new MongoClient(url);
    // Use connect method to connect to the Server
    client.connect(function(err) {
      //assert.equal(null, err);
      if(err) console.log('Connect fail')
      else console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(insertCollectionName);
      // Insert some documents
      collection.find(findData).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
      });
      /*collection.insertMany(insertData, function(err, result) {
        if(err) console.log("Inserte fail")
        else console.log("Inserted 3 documents into the collection");
        callback(result);
        client.close();
      });*/
      //client.close();
    });
    }