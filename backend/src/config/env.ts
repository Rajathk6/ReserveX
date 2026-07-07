import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  DATABASE_URL: str(),
  REDIS_HOST: str(),
  REDIS_PORT: port(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
});

export default env;
