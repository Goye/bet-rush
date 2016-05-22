var mongoose = require('mongoose');
var schema = mongoose.Schema;

var eventSchema = new schema({
    category: {
        type: Array
    },
    socialId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    live: {
        type: Number,
    },
    options: {
        type: Array
    },
    results: {
        type: Array
    },
    // bets: [{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'bet'
    // }],
    closed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('events', eventSchema);