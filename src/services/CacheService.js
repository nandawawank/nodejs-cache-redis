const cacheService = require('redis');
const DEFAULT_EXPIRATION = 3600;

const redisClient = cacheService.createClient({
  host: 'redis',
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (error) => {
  console.log(error);
});

const set = (key, value, expirationInSecond = DEFAULT_EXPIRATION) => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, 'EX', expirationInSecond,
        (error, ok) => {
          if (error) return reject(error);

          return resolve(ok);
        });
  });
};

const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, reply) => {
      if (error) return reject(error);
      if (reply === null) return reject(new Error('Cache tidak ditemukan'));

      return resolve(reply);
    });
  });
};

const remove = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (error, count) => {
      if (error) return reject(error);

      return resolve(count);
    });
  });
};

module.exports = {
  get, set, remove,
};
