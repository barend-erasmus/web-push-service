import * as express from 'express';
import * as uuid from 'uuid';
import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';
import { ClientPostRequestValidator } from '../validators/requests/client-post';
import { WebPushHelper } from '../helpers/web-push';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';

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

  public static async channelsGet(request: express.Request, response: express.Response): Promise<void> {
    const clientRepository: IClientRepository = request['clientRepository'];

    const key: string = request.get('authorization');

    const client: Client = await clientRepository.find(key);

    if (!client) {
      response.status(401).end();

      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    const channels: Array<string> = await subscriptionRepository.findChannels(key);

    response.json(channels);
  }

  protected static generateNewClient(endpoint: string): Client {
    const key: string = uuid.v4();

    const vapidKeys: any = WebPushHelper.generateVAPIDKeys();

    const client: Client = new Client(key, vapidKeys.publicKey, vapidKeys.privateKey, endpoint);

    return client;
  }
}
