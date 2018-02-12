const mongodb = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/Blog';

module.exports ={ 
    test: function (name, password) {
        mongodb.connect(url, function (err, db) {
            db.collection('user').insertOne( {
                "name": name,
                "password": password
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the user sign up details.");
            });
        })
    }
};