import * as express from 'express';
import { Subscription } from '../models/subscription';
import { SubscriptionPostRequestValidator } from '../validators/requests/subscription-post';
import { Client } from '../models/client';
import { SubscriptionDeleteRequestValidator } from '../validators/requests/subscription-delete';
import { SubscriptionService } from '../services/subscription';

export class SubscriptionRouter {
  public static async delete(request: express.Request, response: express.Response): Promise<void> {
    try {
      if (!SubscriptionDeleteRequestValidator.validateParams(request.params)) {
        response.status(400).json({
          message: `Invalid Request Parameters`,
        });

        return;
      }

      if (!SubscriptionDeleteRequestValidator.validateBody(request.body)) {
        response.status(400).json({
          message: `Invalid Request Body`,
        });

        return;
      }

      const channel: string = request.params['channel'];

      const subscription: Subscription = request.body;

      const client: Client = request['client'];

      const subscriptionService: SubscriptionService = request['subscriptionService'];

      await subscriptionService.delete(client.key, channel, subscription.endpoint);

      response.json('OK');
    } catch (error) {
      console.error(error);

      response.json({
        message: error.message,
        stackTrace: error.stackTrace,
      });
    }
  }

  public static async post(request: express.Request, response: express.Response): Promise<void> {
    try {
      if (!SubscriptionPostRequestValidator.validateParams(request.params)) {
        response.status(400).json({
          message: `Invalid Request Parameters`,
        });

        return;
      }

      if (!SubscriptionPostRequestValidator.validateBody(request.body)) {
        response.status(400).json({
          message: `Invalid Request Body`,
        });

        return;
      }

      const channel: string = request.params['channel'];

      const subscription: Subscription = new Subscription(request.body.endpoint, request.body.expirationTime, request.body.keys);

      const client: Client = request['client'];

      const subscriptionService: SubscriptionService = request['subscriptionService'];

      await subscriptionService.insert(client.key, channel, subscription);

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
