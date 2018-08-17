import * as express from 'express';
import { ClientService } from '../services/client';
import { Client } from '../models/client';
import { PromptGetRequestValidator } from '../validators/requests/prompt-get';

export class PromptRouter {
  public static async get(request: express.Request, response: express.Response): Promise<void> {
    if (!PromptGetRequestValidator.validateParams(request.params)) {
      response.status(400).end();

      return;
    }

    if (!PromptGetRequestValidator.validateQueryParams(request.query)) {
      response.status(400).end();

      return;
    }

    const clientService: ClientService = request['clientService'];

    const client: Client = await clientService.find(request.params.id);

    if (!client) {
      response.status(404).end();

      return;
    }

    const host: string = request['configuration'].host.startsWith('localhost') ? `http://${request['configuration'].host}/api/v1` : `https://${request['configuration'].host}/api/v1`;

    response.render('allow-notifications', { client, host, name: request.query.name });
  }
}
