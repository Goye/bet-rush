var mongoose = require('mongoose');
var schema = mongoose.Schema;

var notificationSchema = new schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'event'
    },
    sent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});

module.exports = mongoose.model('notifications', notificationSchema);