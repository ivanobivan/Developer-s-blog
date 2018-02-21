const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    password: String,
    username: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    //bcrypt.compare(password, this.password, callback);
    return this.password === password;
};

UserSchema.pre('save', function saveHook(next) {
    return next();
    /*const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }
        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }
            user.password = hash;
            return next();
        });
    });*/
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
