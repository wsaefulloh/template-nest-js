import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Token {
  public async HashingPassword(password: string): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const result = await bcrypt.hash(password, salt);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async ComparePass(password: string, hash: string): Promise<any> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      throw error;
    }
  }

  public async CreateToken(username: string, password: string): Promise<any> {
    try {
      const payload = {
        username: username,
        password: password,
      };
      const token = jwt.sign(payload, 'secret', {
        expiresIn: '2h',
      });
      const result = {
        token: token,
        message: 'token created, login success',
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
