import * as express from 'express';
import * as uuid from 'uuid';
import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';
import { ClientPostRequestValidator } from '../validators/requests/client-post';
import { WebPushHelper } from '../helpers/web-push';

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

    response.json({
      key: client.key,
      publicKey: client.publicKey,
    });
  }

  protected static generateNewClient(endpoint: string): Client {
    const key: string = uuid.v4();

    const vapidKeys: any = WebPushHelper.generateVAPIDKeys();

    const client: Client = new Client(key, vapidKeys.publicKey, vapidKeys.privateKey, endpoint);

    return client;
  }
}
