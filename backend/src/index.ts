import { env } from './config/env.js';

console.log('Application Starting...');
console.log(env.PORT);
console.log(env.NODE_ENV);
console.log(env.REDIS_PORT);
