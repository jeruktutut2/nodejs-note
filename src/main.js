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
console.log(new Date(Date.now()).toISOString(), "kafka: emailConsumer connected");
await kafkaApp.emailConsumer.subscribe({topic: "email"})
console.log(new Date(Date.now()).toISOString(), "kafka: subscribed to email");
await kafkaConsumer.consumeEmail()
console.log(new Date(Date.now()).toISOString(), "kafka: consume to email");
await kafkaApp.textMessageConsumer.connect()
console.log(new Date(Date.now()).toISOString(), "kafka: textConsumer connected");
await kafkaApp.textMessageConsumer.subscribe({topic: "text-message"})
console.log(new Date(Date.now()).toISOString(), "kafka: subscribed to text-message");
await kafkaConsumer.consumeTextMessage()
console.log(new Date(Date.now()).toISOString(), "kafka: consume to text-message");
await kafkaApp.producer.connect()
console.log(new Date(Date.now()).toISOString(), "kafka: producer connected");

envGlobals.cookieSecret = envGlobals.getCookieSecret()
envGlobals.jwtKey = envGlobals.getJwtKey()
envGlobals.jwtAccessTokenExpireTime = envGlobals.getJwtAccessTokenExpireTime()
envGlobals.jwtRefreskTokenExpireTime = envGlobals.getJwtRefreshTokenExpireTime()

const app = web.listen(process.env.APPLICATION_PORT, () => {
    console.log("app started on port "+process.env.APPLICATION_PORT);
})

process.on("SIGINT", async () => {
    console.log("app has closed all connections.");
    app.close( () => {
        console.log("app has closed all connections.");
    })

    if (redisApp.redis) {
        redisApp.redis.quit()
        console.log("redis: disconnected");
    }

    await rabbitmqApp.channel.close()
    await rabbitmqApp.connection.close()
    console.log("close rabbitmq ");

    await kafkaApp.emailConsumer.disconnect()
    await kafkaApp.textMessageConsumer.disconnect()
    await kafkaApp.producer.disconnect()
    console.log("close kafka producer");

    process.exit(0)
})