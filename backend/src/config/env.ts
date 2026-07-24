import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  DATABASE_URL: str(),
  REDIS_HOST: str(),
  REDIS_PORT: port(),
  REDIS_PASSWORD: str({
    default: '',
  }),
  JWT_ACCESS_SECRET: str(),
  JWT_ACCESS_EXPIRES_IN: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_EXPIRES_IN: str(),
});

export default env;
