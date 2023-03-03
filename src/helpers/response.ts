import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class StandartResponse {
  public response(res: Response, statuses: number, result: any) {
    let desc = '';

    switch (statuses) {
      case 200:
        desc = 'OK';
        break;
      case 201:
        desc = 'Created';
        break;
      case 400:
        desc = 'Bad Request';
        break;
      case 401:
        desc = 'Unauthorized';
        break;
      case 404:
        desc = 'Page Not Found';
        break;
      case 500:
        desc = 'Internal Server Error';
        break;
      case 501:
        desc = 'Bad Gateway';
        break;
      case 304:
        desc = 'Not Modified';
        break;
      default:
        desc = '';
    }

    const isObject = (data: any) => {
      return !!data && data.constructor === Object;
    };

    const result_respone = {
      status: statuses,
      description: desc,
      result: isObject(result)
        ? [result]
        : Array.isArray(result)
        ? result
        : result,
    };

    return res.status(statuses).json(result_respone);
  }
}
