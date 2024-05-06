import { web } from "./application/web.js";
import redisApp from "./application/redis.js";
import rabbitmqApp from "./application/rabbitmq.js";
import rabbitmqConsumer from "./consumer/rabbitmq.js";
import kafkaApp from "./application/kafka.js";
import kafkaConsumer from "./consumer/kafka.js";
import envGlobals from "./globals/env.js";

redisApp.redis = await redisApp.newConnection()

rabbitmqConsumer.consume()
await kafkaApp.emailConsumer.connect()
console.log(new Date(), "kafka: emailConsumer connected");
await kafkaApp.emailConsumer.subscribe({topic: "email"})
console.log(new Date(), "kafka: subscribed to email");
await kafkaConsumer.consumeEmail()
console.log(new Date(), "kafka: consume to email");
await kafkaApp.textMessageConsumer.connect()
console.log(new Date(), "kafka: textConsumer connected");
await kafkaApp.textMessageConsumer.subscribe({topic: "text-message"})
console.log(new Date(), "kafka: subscribed to text-message");
await kafkaConsumer.consumeTextMessage()
console.log(new Date(), "kafka: consume to text-message");
await kafkaApp.producer.connect()
console.log(new Date(), "kafka: producer connected");

envGlobals.cookieSecret = envGlobals.getCookieSecret()
envGlobals.jwtKey = envGlobals.getJwtKey()
envGlobals.jwtAccessTokenExpireTime = envGlobals.getJwtAccessTokenExpireTime()
envGlobals.jwtRefreskTokenExpireTime = envGlobals.getJwtRefreshTokenExpireTime()

const app = web.listen(process.env.APPLICATION_PORT, () => {
    console.log(new Date(), "app started on port "+process.env.APPLICATION_PORT);
})

process.on("SIGINT", async () => {
    console.log(new Date(), "app has closed all connections.");
    app.close( () => {
        console.log(new Date(), "app has closed all connections.");
    })

    if (redisApp.redis) {
        redisApp.redis.quit()
        console.log(new Date(), "redis: disconnected");
    }

    await rabbitmqApp.channel.close()
    await rabbitmqApp.connection.close()
    console.log(new Date(), "close rabbitmq ");

    await kafkaApp.emailConsumer.disconnect()
    await kafkaApp.textMessageConsumer.disconnect()
    await kafkaApp.producer.disconnect()
    console.log(new Date(), "close kafka producer");

    process.exit(0)
})