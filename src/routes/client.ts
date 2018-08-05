import * as express from 'express';
import { Client } from '../models/client';
import { ClientPostRequestValidator } from '../validators/requests/client-post';
import { ClientService } from '../services/client';
import { PushManagerHelper } from '../helpers/push-manager';

export class ClientRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    if (!ClientPostRequestValidator.validateBody(request.body)) {
      response.status(400).json({
        message: `Invalid Request Body`,
      });

      return;
    }

    const endpoint: string = request.body.endpoint;

    const clientService: ClientService = request['clientService'];

    const client: Client = await clientService.create(endpoint);

    response.json({
      applicationServerKey: PushManagerHelper.publicKeyToApplicationServerKey(client.publicKey),
      key: client.key,
      publicKey: client.publicKey,
    });
  }

  public static async channelsGet(request: express.Request, response: express.Response): Promise<void> {
    const client: Client = request['client'];

    const clientService: ClientService = request['clientService'];

    const channels: Array<string> = await clientService.channels(client.key);

    response.json(channels);
  }
}
