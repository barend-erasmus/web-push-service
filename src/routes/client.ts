import * as express from 'express';
import { Client } from '../models/client';
import { ClientPostRequestValidator } from '../validators/requests/client-post';
import { ClientService } from '../services/client';

export class ClientRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    try {
      if (!ClientPostRequestValidator.validateBody(request.body)) {
        response.status(400).json({
          message: `Invalid Request Body`,
        });

        return;
      }

      const endpoint: string = request.body.endpoint;

      const clientService: ClientService = request['clientService'];

      const client: Client = await clientService.create(endpoint);

      response.status(201).json({
        id: client.id,
        key: client.key,
        publicKey: client.publicKey,
      });
    } catch (error) {
      console.error(error);

      response.status(500).json({
        message: 'An error occurred'
      });
    }
  }

  public static async channelsGet(request: express.Request, response: express.Response): Promise<void> {
    try {
      const client: Client = request['client'];

      const clientService: ClientService = request['clientService'];

      const channels: Array<string> = await clientService.channels(client.key);

      response.json(channels);
    } catch (error) {
      console.error(error);

      response.status(500).json({
        message: error.message,
        stackTrace: error.stackTrace,
      });
    }
  }
}
