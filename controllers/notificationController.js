const Notification = require("../models/notification");
const sendToQueue = require("../queue/publisher");

exports.sendNotification = async (req, res) => {
    const { userId, ModeType, message } = req.body;
    if (!userId || !ModeType || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // console.log("Incoming request body:", req.body);
        // here we are saving notification to MongoDB
        const notification = new Notification({ userId, ModeType, message });
        await notification.save();
        // console.log("Notification saved:", notification);
        // here  send notification to rabbitMQ
        await sendToQueue({
            userId,
            ModeType,
            message,
            notification_id: notification._id.toString(),
        });

        // console.log("Notification sent to queue");

        res
            .status(200)
            .json({ message: 'Notification successfully queued', id: notification._id });

    } catch (error) {
        console.log("Error sending notification", error);
        res.status(500).json({ error: "Internal server error" });
    }

};

exports.getUserNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.find({ userId: id });
        res.status(200).json(notification);
    } catch (error) {
        console.log("error fertching notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
