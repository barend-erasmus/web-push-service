import * as express from 'express';
import { Client } from '../models/client';
import { PushPostRequestValidator } from '../validators/requests/push-post';
import { PushService } from '../services/push';

export class PushRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    try {
      if (!PushPostRequestValidator.validateParams(request.params)) {
        response.status(400).json({
          message: `Invalid Request Parameters`,
        });

        return;
      }

      const channel: string = request.params['channel'];

      const payload: any = request.body;

      const client: Client = request['client'];

      const pushService: PushService = request['pushService'];

      await pushService.create(client, channel, payload);

      response.json('OK');
    } catch (error) {
      console.error(error);

      response.json({
        message: error.message,
        stackTrace: error.stackTrace,
      });
    }
  }
}
