const { createClient } =  require('redis');
// require('dotenv').config()

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

redis.on('error', err => console.log('Redis Client Error', err));

async function connectRedis(){
  await redis.connect();

  // await redis.set('foo', 'bar');
  // const result = await redis.get('foo');
  // console.log(result, ">>> Redis lewat")  // >>> bar
}

connectRedis()

module.exports = redis
