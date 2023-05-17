import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import { IAuthToken, IJwtPayload, IToken } from '../interfaces/auth.interface';

export default class Token implements IToken {
  #jwt;

  #options: jwt.SignOptions;

  constructor() {
    this.#jwt = jwt;
    this.#options = {
      expiresIn: '3h',
      algorithm: 'HS256',
    };
  }

  async generateToken(payload: IJwtPayload) {
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const token = await this.#jwt.sign(payload, secret, this.#options);
    return token;
  }

  async authToken(token: string): Promise<IAuthToken> {
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const validateToken = await this.#jwt.verify(token, secret);
    return validateToken as IAuthToken;
  }
}
