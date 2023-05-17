import * as crypto from 'crypto';

export default class Decrypt {
  #crypto = crypto;

  createHash = (password: string) => {
    const hash = this.#crypto.createHash('md5').update(password).digest('hex');
    return hash;
  }

  compareHash = (password: string, hash: string) => {
    const newHash = this.createHash(password);
    return newHash === hash;

  }

  decrypt = (password: string) => {
    const decipher = this.#crypto.createDecipher('aes192', 'a password');
    let decrypted = decipher.update(password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};