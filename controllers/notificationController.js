const Notification = require("../models/notification");
const sendToQueue = require("../queue/publisher");

exports.sendNotification = async(req, res) =>{
    const { userId, ModeType, message } = req.body; 
    if( !userId || !ModeType || !message ){
        return res.status(400).json({error: "Missing required fields"});
    }

    const notification = new Notification({ userId, ModeType, message });
    await  notification.save();
    // here  send notification to rabbitMQ
    await sendToQueue( notification);

    res
    .status(200)
    .json({ message: 'Successfully notification queued', id: notification_id });
};

exports.getUserNotification = async ( req, res ) => {
    const id = req.params;
    const notification = await Notification.find({ userId :id });
    res.status(200).json(notification);
};
