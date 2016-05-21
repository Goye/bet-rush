var mongoose = require('mongoose');
var schema = mongoose.Schema;

var eventSchema = new schema({
    name: {
        type: String,
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'preference'
    }],
    live: {
        type: Date,
    },
    options: {
        type: Array
    },
    results: {
        type: Array
    },
    bets: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'bet'
    }],
    closed: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('user', eventSchema);