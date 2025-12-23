const { createClient } =  require('redis');
// require('dotenv').config()

const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.log('Max Redis retries reached');
            return new Error('Max retries');
          }
          return retries * 100;
        }
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        connectTimeout: 10000,  // ← Timeout 10 detik
        keepAlive: 30000        // ← Keep alive 30 detik
      }
});

redis.on('error', err => console.log('Redis Client Error', err));
redis.on('reconnecting', () => {
  console.log('Redis reconnecting...');
});

redis.on('ready', () => {
  console.log('Redis ready');
});

async function connectRedis(){
  await redis.connect();

  // await redis.set('foo', 'bar');
  // const result = await redis.get('foo');
  // console.log(result, ">>> Redis lewat")  // >>> bar
}

connectRedis()

module.exports = redis
