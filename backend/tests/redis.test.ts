import { redis } from '../src/config/redis';
import { redisService } from '../src/modules/core/services/redis.service';
async function main() {
  await redis.connect();

  await redisService.set(
    'hello',
    {
      a: 'testingS',
    },
    60,
  );

  const value = await redisService.get('hello');

  console.log(value);

  await redis.quit();
}

main();
