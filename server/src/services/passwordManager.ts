import { hash, genSalt, compare as comparePasswords } from 'bcryptjs';

export class PasswordManager {
  static async toHash(password: string) {
    const salt: string = await genSalt(10);
    const hasedPassword: string = await hash(password, salt);

    return hasedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return await comparePasswords(suppliedPassword, storedPassword);
  }
}
