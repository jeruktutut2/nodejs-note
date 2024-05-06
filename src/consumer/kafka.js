import kafkaApp from "../application/kafka.js";

const consumeEmail = async () => {
    await kafkaApp.emailConsumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("consumeEmail:", topic, partition, message.value.toString());
        }
    })
}

const consumeTextMessage = async () => {
    await kafkaApp.textMessageConsumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("consumeTextMessage:", topic, partition, message.value.toString());
        }
    })
}

export default {
    consumeEmail,
    consumeTextMessage
}