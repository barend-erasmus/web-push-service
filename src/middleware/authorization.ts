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

      const keyOrPublicKey: string = request.get('authorization');

      if (!keyOrPublicKey) {
        response.status(401).end();

        return;
      }

      const clientByKey: Client = await clientRepository.find(keyOrPublicKey);

      const clientByPublicKey: Client = await clientRepository.findByPublicKey(keyOrPublicKey);

      if (!clientByKey && !clientByPublicKey) {
        response.status(401).end();

        return;
      }

      request['client'] = clientByKey || clientByPublicKey;

      next();
    };
  }
}
