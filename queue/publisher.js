require("dotenv").config();
const amqp =  require("amqplib");

async function sendToQueue( notification){
    const connection = await amqp.connect("process.env.RABBITMQ_URI");
    const channel = await connection.createChannel();
    const queue = 'notification';
    
    await channel.assertQueue( queue );
    channel.sendToQueue( queue,
        Buffer.from(JSON.stringify(notification))
    );
    setTimeout( () => {
        channel.close();
        connection.close();
    }, 500);
}

module.exports = sendToQueue ;