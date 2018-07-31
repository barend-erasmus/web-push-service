import * as express from 'express';
import * as uuid from 'uuid';
import { IClientRepository } from '../interfaces/client-repository';
import * as webpush from 'web-push';
import { Client } from '../models/client';

export class AuthenticateRouter {
  public static async key(request: express.Request, response: express.Response): Promise<void> {
    const clientRepository: IClientRepository = request['clientRepository'];

    const key: string = uuid.v4();

    const vapidDetails: any = webpush.generateVAPIDKeys();

    const client: Client = new Client(key, vapidDetails.publicKey, vapidDetails.privateKey);

    clientRepository.insert(client);

    response.json(client);
  }
}
