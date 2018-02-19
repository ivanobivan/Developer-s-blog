const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = 'blog';

module.exports = {
    mongoURL,
    test(name, password) {
        MongoClient.connect(url, (err, client) => {
            assert.equal(err, null);
            console.log('successfully connection to db Server');
            const db = client.db(dbName);
            db.collection(collectionName).insertOne({
                "name": name,
                "password": password
            }, function (err, result) {
                assert.equal(err, null);
                console.log("Saved the user sign up details.");
            });
        })
    },
    connect() {
        MongoClient.connect(url, (err, client) => {
            assert.equal(err, null);
            console.log('successfully connection to db Server');
        });
    },
    authorisation() {
        const user = {
            username: 'test-user',
            password: 'test-password', id: 1
        };
        passport.use(new LocalStrategy(
            function(username, password, done) {
                findUser(username, function (err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }
                    if (password !== user.password ) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            }
        ))
    }
};



