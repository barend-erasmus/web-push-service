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

      const key: string = request.get('authorization');

      if (!key) {
        response.status(401).end();

        return;
      }

      const client: Client = await clientRepository.find(key);

      if (!client) {
        response.status(401).end();

        return;
      }

      request['client'] = client;

      next();
    };
  }
}
