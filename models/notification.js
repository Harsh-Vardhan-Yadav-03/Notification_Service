const mongoose = require("mongoose");

const NotificationSchema  = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    ModeType: {
        type: String,
        enum: ['email', 'sms','in-app']
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending',
    },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;