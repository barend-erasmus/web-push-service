import * as express from 'express';
import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';

export class AuthorizationMiddleware {
  public static build(): (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => Promise<void> {
    return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      const clientRepository: IClientRepository = request['clientRepository'];

      const authorizationHeader: string = request.get('authorization');

      if (!authorizationHeader) {
        response.status(401).end();

        return;
      }

      const type: string = authorizationHeader.split(' ')[0];

      if (type === 'key') {
        const key: string = authorizationHeader.split(' ')[1];

        const client: Client = await clientRepository.find(key);

        if (!client) {
          response.status(401).end();

          return;
        }

        request['client'] = client;
      } else {
        response.status(401).end();

        return;
      }

      next();
    };
  }
}
