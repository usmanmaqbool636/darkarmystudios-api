import redis from 'redis';
const client = redis.createClient({
    host: "redis-12737.c84.us-east-1-2.ec2.cloud.redislabs.com",
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

client.on('error', err => {
    console.log('Error ' + err);
});

client.on('connection', res => {
    console.log('connect', res);
})

export default client;