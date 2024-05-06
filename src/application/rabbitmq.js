import { connect } from "amqplib";

const connection = await connect("amqp://"+process.env.RABBITMQ_USERNAME+":"+process.env.RABBITMQ_PASSWORD+"@"+process.env.RABBITMQ_HOST+":"+process.env.RABBITMQ_PORT+"/")
const channel = await connection.createChannel()

export default {
    connection,
    channel
}