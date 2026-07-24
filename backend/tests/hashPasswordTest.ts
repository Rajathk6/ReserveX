import { hashPassword, verifyPassword } from '../src/modules/authentication/utils/password';
async function main() {
  const hash = await hashPassword('password');
  console.log(hash);

  const verify = await verifyPassword(
    'password',
    '$2b$12$SCYxV7By41N3a5FC4/0neOhVQoVob1hPXU9jQblgaSC61AnDPcNVq',
  );
  console.log(verify);
}
main();
