import { redis } from '../../../config/redis.js';

export class RedisService {
  async get<T>(key: string) {
    const value = await redis.get(key);
    if (!value) return null;

    return JSON.parse(value) as T;
  }

  async set(key: string, value: unknown, ttl?: number) {
    const serialized = JSON.stringify(value);

    if (ttl) {
      await redis.set(key, serialized, {
        expiration: {
          type: 'EX',
          value: ttl,
        },
      });
      return;
    }

    await redis.set(key, serialized);
  }

  async del(key: string) {
    await redis.del(key);
  }

  async exists(key: string) {
    return (await redis.exists(key)) === 1;
  }

  async incr(key: string) {
    await redis.incr(key);
  }

  async expire(key: string, sec: number) {
    await redis.expire(key, sec);
  }

  async flush() {
    await redis.flushDb();
  }
}

export const redisService = new RedisService();
