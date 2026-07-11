import { AuthService } from '../src/modules/authentication/services/auth.service';
async function main() {
  const authService = new AuthService();
  const hash = await authService.hashPassword('password');
  console.log(hash);

  const verify = await authService.verifyPassword(
    'password',
    '$2b$12$SCYxV7By41N3a5FC4/0neOhVQoVob1hPXU9jQblgaSC61AnDPcNVq',
  );
  console.log(verify);
}
main();
