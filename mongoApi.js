const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'test';

module.exports ={

    test: function (name, password) {
        MongoClient.connect(url,  (err, client) => {
            assert.equal(err, null);
            console.log('successfully connection to db Server');
            const db = client.db(dbName);
            db.collection('blog').insertOne( {
                "name": name,
                "password": password
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the user sign up details.");
            });
        })
    }
};