require("dotenv").config();
const amqp = require("amqplib");
const Notification = require("../models/notification");
const delivery = require("../services/DeliveryService");

async function consumeQueue() {
    const connection = await amqp.connect("process.env.RABBITMQ_URI");
    const channel = await connection.createChannel();
    const queue = 'notification';

    await channel.assertQueue(queue);

    channel.consume( queue, async msg => {
        if(msg !== null ){
            const data = JSON.parse(msg.content.toString());
            try {
                await delivery.send(data);
                await Notification.findByIdAndUpdate( data._id, { status: "sent" });
                channel.ack(msg);
                console.log(`Notification sent successfully to ${data.ModeType}`);
            } catch (error) {
                console.log("Message Delivery failed");
                channel.ack(msg);
            }
        }
    });
    console.log("Consumer running...");
};

module.exports = consumeQueue;
