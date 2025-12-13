const { createClient } =  require('redis');

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

redis.on('error', err => console.log('Redis Client Error', err));

// async function testRedis(){
//   await redis.connect();

//   await redis.set('foo', 'bar');
//   const result = await redis.get('foo');
//   console.log("Redis lewat")  // >>> bar
// }

// testRedis()

module.exports = redis
