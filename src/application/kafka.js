import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
    brokers: ["localhost:9092"]
})

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
})

const emailConsumer = kafka.consumer({
    groupId: "email-consumer-group"
})

const textMessageConsumer = kafka.consumer({
    groupId: "text-message-consumer-group"
})

export default {
    producer,
    emailConsumer,
    textMessageConsumer
}