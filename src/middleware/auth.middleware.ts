import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { StandartResponse } from 'src/helpers/response';
import { Token } from '../helpers/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private token: Token = new Token();
  private standartResponse: StandartResponse = new StandartResponse();
  async use(req: Request, res: Response, next: NextFunction) {
    let access_token = req.headers.authorization;
    if (access_token == undefined) {
      this.standartResponse.response(
        res,
        401,
        'You Must Login to Access this Service',
      );
    } else {
      access_token = access_token.split(' ')[1];
    }

    try {
      const resultVerify = await this.token.verifyToken(access_token);
      console.log(resultVerify);

      if (resultVerify.username) {
        return next();
      } else {
        this.standartResponse.response(res, 500, 'Token Unavailable');
      }
    } catch (error) {
      this.standartResponse.response(res, 500, 'Token Unavailable');
    }
  }
}
