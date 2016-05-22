var mongoose = require('mongoose');
var schema = mongoose.Schema;

var preferenceSchema = new schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    relatedPreference: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'preference'
    }],
    weigth: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('preferences', preferenceSchema);