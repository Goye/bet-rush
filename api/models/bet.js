var mongoose = require('mongoose');
var schema = mongoose.Schema;

var betSchema = new schema({
    value: {
        type: Number,
        required: true
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'event'
    }],
    option: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('bet', betSchema);