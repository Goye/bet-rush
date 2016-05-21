var mongoose = require('mongoose');
var schema = mongoose.Schema;
var preference = require('./preference');

var userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    socialId: {
        type: String,
    },
    preferences: [preference.schema],
    discards: [preference.schema],
    wallet: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('user', userSchema);