import * as express from 'express';
import * as uuid from 'uuid';
import { IClientRepository } from '../interfaces/client-repository';
import * as webpush from 'web-push';
import { Client } from '../models/client';
import { ClientPostRequestValidator } from '../validators/requests/client-post';

export class ClientRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    if (!ClientPostRequestValidator.validateBody(request.body)) {
      response.status(400).json({
        message: `Invalid Request Body`,
      });

      return;
    }

    const endpoint: string = request.body.endpoint;

    const clientRepository: IClientRepository = request['clientRepository'];

    const client: Client = ClientRouter.generateNewClient(endpoint);

    clientRepository.insert(client);

    response.json(client);
  }

  protected static generateNewClient(endpoint: string): Client {
    const key: string = uuid.v4();

    const vapidDetails: any = webpush.generateVAPIDKeys();

    const client: Client = new Client(key, vapidDetails.publicKey, vapidDetails.privateKey, endpoint);

    return client;
  }
}
