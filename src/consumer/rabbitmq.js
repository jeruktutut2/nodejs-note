import rabbitmqApp from "../application/rabbitmq.js";
const consume = async () => {
    await rabbitmqApp.channel.consume("email", function(message) {
        console.log("routingKey:", message.fields.routingKey);
        console.log("content:", message.content.toString());
    }, {
        noAck: true
    })
}

export default {
    consume
}