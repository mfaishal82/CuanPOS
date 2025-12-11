const { createClient } =  require('redis');

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

client.on('error', err => console.log('Redis Client Error', err));

async function testRedis(){
  await client.connect();

  await client.set('foo', 'bar');
  const result = await client.get('foo');
  console.log(result)  // >>> bar
}

testRedis()

module.exports = client
