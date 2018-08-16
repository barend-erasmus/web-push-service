import * as express from 'express';
import { ClientService } from '../services/client';
import { Client } from '../models/client';

export class PromptRouter {
  public static async home(request: express.Request, response: express.Response): Promise<void> {
    // TODO: Parameter validation

    const clientService: ClientService = request['clientService'];

    const client: Client = await clientService.find(request.params.id);

    if (!client) {
      response.status(404).end();

      return;
    }

    response.render('allow-notifications', { client, host: 'http://localhost:8080/api/v1' });
  }
}
